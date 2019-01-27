<template>
  <section class="container">
    <card>
      <h1>留言板</h1>
      <p>超级简陋的留言板，完成功能先，样式稍后再搞（笑哭）。</p>
    </card>
    <card style="margin-top: 20px;">
      <textarea class="message-textarea" v-model="currentMsg" placeholder="说点啥再走呗" type="text" />
      <br>
      昵称：<input v-model="user.nickName" placeholder="请输入昵称" type="text" style="width: 200px;" />
      <br>
      邮箱：<input v-model="user.email" placeholder="请输入邮箱" type="text" style="width: 200px;" />
      <br>
      网站：<input v-model="user.siteUrl" placeholder="请输入网站" type="text" style="width: 200px;" />
      <br>
      <button class="leave-msg-btn" type="button" :disabled="!currentMsg.trim()" @click="handleLeaveMsg">提交</button>
      <div class="message-list">
        <ol>
          <li v-for="item in msgList" :key="item._id">
            <div class="message-avatar">{{ item.nickName.substr(0, 1).toUpperCase() }}</div>
            <div>
              <div class="message-content-info">
                <a v-if="item.siteUrl" :href="item.siteUrl" target="_blank">{{ item.nickName }}</a>
                <div v-else>{{ item.nickName }}</div>
                <time>{{ item.createTime | dateFormat }}</time>
              </div>
              <div class="message-content">{{ item.content }}</div>
            </div>
          </li>
        </ol>
      </div>
    </card>
  </section>
</template>
<script>
import moment from 'moment'
import cookie from 'js-cookie'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'
import Card from '~/components/Card'

export default {
  components: { Card },
  async asyncData({ req, app }) {
    const result = await app.$axios.$get('/api/message')
    return {
      msgList: result.data.list,
    }
  },
  data() {
    return {
      currentMsg: '',
      user: {
        nickName: cookie.get('userNickName') || '',
        email: cookie.get('userEmail') || '',
        siteUrl: cookie.get('userSiteUrl') || '',
      },
    }
  },
  head() {
    return {
      title: `${this.siteInfo.siteName} - 留言板`
    }
  },
  methods: {
    async handleLeaveMsg() {
      let { nickName, email, siteUrl } = this.user
      nickName = nickName.trim()
      email = email.trim()
      siteUrl = siteUrl.trim()
      if (!nickName || !email) {
        alert('记得输入昵称和邮箱哦')
        return
      }
      if (!isEmail(email)) {
        alert('请输入合法邮箱哦')
        return
      }
      if (siteUrl && !isURL(siteUrl, { require_protocol: true })) {
        alert('请输入合法网站地址哦')
        return
      }
      const result = await this.$axios.$post('/api/message', {
        nickName: nickName,
        email: email,
        siteUrl: siteUrl,
        content: this.currentMsg.trim(),
      })
      cookie.set('userNickName', nickName, { expires: 365 })
      cookie.set('userEmail', email, { expires: 365 })
      cookie.set('userSiteUrl', siteUrl, { expires: 365 })
      this.msgList.unshift(result.data)
      this.currentMsg = ''
    },
  },
  filters: {
    dateFormat(datetime, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(datetime).format(format)
    },
  },
}
</script>

<style lang="scss" scoped>
.message-textarea {
  width: 400px;
  height: 100px;
}
.leave-msg-btn {
  width: 100px;
  height: 30px;
  margin-top: 8px;
  background-color: $blue;
  color: #fff;
  &[disabled] {
    opacity: .3;
    cursor: not-allowed;
  }
}

.message-list {
  margin-top: 20px;
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-top: 1px dashed $gray;
      .message-avatar {
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        font-size: 24px;
        background-color: $blue;
      }
      > div:last-child {
        flex: 1;
        margin-left: 20px;
      }
      .message-content-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        time {
          font-size: 12px;
        }
      }
      .message-content {
        margin-top: 10px;
      }
    }
  }
}
</style>
