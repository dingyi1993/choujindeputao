<template>
  <footer>
    <div class="huaji"><div></div></div>
    <div class="content">
      <div>
        <div class="block-title">标签</div>
        <div class="block-content">
          <div id="tags" style="display: none;">
            <ul>
              <li><a href="/tag/#2323" target="_blank">werter(12)</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="gaoji">
        <div class="block-title">基友们</div>
        <div class="block-content">
          <ul class="clearfix">
            <li v-for="item in friends" :key="item.href">
              <a :href="item.href" :title="item.desc" class="buling" target="_blank">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="find-me">
        <div class="block-title">来抓我呀</div>
        <div class="block-content">
          <!-- <a class="github-btn" href="https://github.com/" title="github" target="_blank"><i class="fa fa-github"></i></a>
          <a class="weibo-btn" href="http://weibo.com/" title="微博" target="_blank"><i class="fa fa-weibo"></i></a>
          <a class="weixin-btn" href="javascript:;" title="微信"><i class="fa fa-weixin"></i><div class="weixin-qrcode"><img src="/images/weixin_qrcode.jpg"></div></a>
          <a class="email-btn" href="mailto:" title="邮箱："><i class="fa fa-envelope"></i></a>
          <a class="rss-btn" href="/feed.xml" title="rss" target="_blank"><i class="fa fa-rss"></i></a> -->
          <div class="info">
            <p>© {{ siteInfo.year }} {{ siteInfo.siteName }} · <a href="/about/" target="_blank">关于</a></p>
            <p>粤ICP备<a href="http://www.miitbeian.gov.cn" target="_blank">17154515</a>号</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      friends: [
        { name: 'Scott', href: 'http://www.chengfeilong.com', desc: '一生想做优雅前端' },
        { name: '天道总司', href: 'http://zhaoyuxiang.cn', desc: '聪明在于勤奋，天才在于积累' },
        { name: 'SNlone', href: 'http://www.wecho.cc', desc: '在知识面前，我永远是个孩子' },
        { name: '猫先生', href: 'http://nekosun.org', desc: '时光梦旅者' },
        { name: '花花丹', href: 'http://daphnechang.github.io', desc: '一朵会编程的花' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/variables/index.scss';

footer {
  position: relative;
  background-color: #222;
}
.huaji {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  overflow: hidden;
  @include mobile {
    top: -30px;
  }
  > div {
    height: 40px;
    background-image: url('../static/images/huaji.png');
    background-size: 80px;
    background-position: left top;
    background-repeat: no-repeat;
    // background-color: #eee;
    transform: translateX(-20%);
    animation: silde 10s 5s infinite linear;
    @keyframes silde {
      0% { transform: translateX(-20%); }
      33% { transform: translateX(100%); }
      100% { transform: translateX(100%); }
    }
    @include mobile {
      height: 30px;
      background-size: 60px;
    }
  }
  z-index: 2;
}
.content {
  display: flex;
  width: 1000px;
  height: 300px;
  margin: 0 auto;
  padding: 20px 12px;
  @include mobile {
    width: 100%;
    height: 200px;
  }
  > div {
    flex: 1;
  }
}
.block-title {
  font-size: 20px;
  color: #fff;
}
.block-content {
  color: $darkGray;
  a {
    display: inline-block;
    color: $darkGray;
    &:hover {
      color: $gray;
    }
  }
}
.gaoji {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: block;
      float: left;
      width: 50%;
      line-height: 30px;
    }
  }
}
// #bottom {
//   position: relative;
//   margin-top: 30px;
//   background-color: #222;

//   &.not-ready {
//       visibility: hidden;
//   }


//   .content {
//     position: relative;
//     height: 300px;
//     width: $mainMaxWidth;
//     margin: 0 auto;
//     padding: 20px 0;

//     @include middle-screen1 {
//         width: $mainMiddleWidth;
//     }
//     @include middle-screen2 {
//         width: 95%;
//         height: auto;
//     }

//     .other-item {
//       float: left;
//       width: 33.3%;

//       @include middle-screen2 {
//           float: none;
//           width: 100%;
//       }

//       .other-title {
//           color: #fff;
//           text-align: left;
//           font-size: 2rem;
//       }

//       &.gaoji {
//           ul {
//               list-style: none;
//               margin: 0;
//               padding: 0;

//               li {
//                   display: block;
//                   float: left;
//                   width: 50%;
//                   line-height: 30px;

//                   a {
//                       display: inline-block;
//                       color: $darkGray;

//                       &:hover {
//                           color: $gray;
//                           @include animation(buling 5s infinite ease-in-out);
//                       }
//                   }
//               }
//           }
//       }

//       &.find-me {
//           .other-content {
//               > a {
//                   display: inline-block;
//                   font-size: 3rem;
//                   color: $darkGray;
//                   margin-right: 10px;

//                   &:last-child {
//                       margin-right: 0;
//                   }

//                   &.github-btn:hover {
//                       color: #4078c0;
//                   }
//                   &.weibo-btn:hover {
//                       color: #e6162d;
//                   }
//                   &.weixin-btn {
//                       position: relative;

//                       &:hover {
//                           color: #51c332;

//                           .weixin-qrcode {
//                               bottom: 80px;
//                               opacity: 1;
//                               visibility: visible;
//                           }
//                       }
//                   }
//                   &.email-btn:hover {
//                       color: #fff;
//                   }
//                   &.rss-btn:hover {
//                       color: #f78422;
//                   }

//                   .weixin-qrcode {
//                       position: absolute;
//                       display: block;
//                       visibility: hidden;
//                       width: 200px;
//                       bottom: 100px;
//                       left: 50%;
//                       margin-left: -100px;
//                       opacity: 0;
//                       z-index: 4;
//                       @include transition(all .6s cubic-bezier(.19,1,.5,1));
//                       -webkit-will-change: opacity, bottom;
//                       will-change: opacity, bottom;

//                       img {
//                           display: block;
//                           border-radius: 10px;
//                       }
//                   }
//               }

//               .info {
//                   margin-top: 50px;
//                   color: $darkGray;

//                   a {
//                       color: $darkGray;

//                       &:hover {
//                           color: $gray;
//                       }
//                   }
//               }
//           }
//       }
//     }
//   }
// }
</style>
