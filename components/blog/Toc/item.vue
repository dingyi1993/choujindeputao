<template>
  <ol :class="[(list.length && list[0].level === 2) ? 'nav' : 'nav-child']">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="['nav-item', `nav-level-${item.level}`, { active: false, 'active-current': false }]"
    >
      <a class="nav-link" :href="`#${item.anchor}`"><span class="nav-number">{{ rootIndex + (index + 1) }}.</span> <span class="nav-text">{{ item.content }}</span></a>
      <toc-item v-if="item.children" :list="item.children" :root-index="rootIndex + (index + 1) + '.'"></toc-item>
    </li>
  </ol>
</template>
<script>
export default {
  name: 'TocItem',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    rootIndex: {
      type: String,
      default: '',
    },
  },
}
</script>
