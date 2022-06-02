module.exports = {
    base: "/",
    lang: "zh-CN",
    title: "quick",
    description: "quick框架是基于vue3技术栈和vite构建的一套后台管理系统框架.",
    // locales:{},
    head: [
      [
        "link",
        {
          rel: "icon",
          href: "/favicon.svg",
        },
      ],
      [
        "meta",
        {
          name: "keywords",
          content: "quick 后台 管理 平台 系统",
        },
      ],
      [
        "meta",
        {
          name: "description",
          content:
            "quick-vue3-doc是基于vitepress使用Markdown语法编写的文档。",
        },
      ],
    ],
    themeConfig: {
      logo: "/logo.svg",
      search: true,
      searchMaxSuggestions: 10,
      // smoothScroll: true,
      repo: "vuejs/vitepress",
      // docsDir: "docs",
      // lastUpdated: true,
      // lastUpdated: 'Last Updated',
      // editLinks: true,
      // editLinkText: '为此页提供修改建议',
  
      nav: [
        {
          text: "指南",
          link: "/guide/index",
          activeMatch: "^/$|^/guide/",
        },
        {
          text: "组件",
          link: "/components/index",
        },
        {
          text: "版本",
          items: [
            {
              text: "1.x",
              link: "http://localhost:3000/v1",
            },
            {
              text: "2.x",
              link: "http://localhost:3000/v2",
            },
          ],
        },
        {
          text: "选择语言",
  
          items: [
            {
              text: "简体中文",
              link: "/zh",
            },
            {
              text: "English",
              link: "/en",
            },
          ],
        },
      ],
      sidebar: {
        "/guide/": [
          {
            text: "介绍",
            children: [
              {
                text: "quick是什么？",
                link: "/guide/introduction",
                children: [],
              },
              {
                text: "安装",
                link: "/guide/install",
                children: [],
              },
            ],
          },
        ],
        "/components/": [
          {
            text: "安装",
            children: [],
          },
        ],
      },
    },
  };