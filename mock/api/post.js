const posts = [
  {
    title: 'Use pure CSS elegant configuration mobile REM layout',
    author: 'Big face',
    category: 'Css',
    description: 'Usually configured ReM layouts will be treated with JS, such as the design draft of 750...',
    content: 'Usually configured ReM layouts will be treated with JS, such as the design draft of 750',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-11-04T04:03:36.000Z',
    updateDate: '2021-11-04T04:03:36.000Z',
  },
  {
    title: 'Vue2&Vue3 project style guide',
    author: 'Ronnie',
    category: 'Vue',
    description: 'The project style of Vue2 and Vue3 summarized',
    content: '### 1. Naming styIf the folder is composed of multiple words, it should always be connected horizontally该始终是横线连接 ',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-10-25T08:57:47.000Z',
    updateDate: '2022-02-28T04:02:39.000Z',
  },
  {
    title: 'How to add watermarks to the picture elegantly',
    author: 'Big face',
    category: 'JavaScript',
    description: 'Add watermark to the picture elegantly',
    content: 'I wrote an article before recorded a history of optimization of uploading pictures',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-06-24T18:46:19.000Z',
    updateDate: '2021-09-23T07:51:22.000Z',
  },

  {
    title: 'Understanding of the front cache',
    author: 'Big face',
    category: 'Http',
    description: 'Talk about the understanding of the front cache',
    content:
      '> background\n\N company has a VUE-After the CLI3 mobile WEB project is published, it is found that some users have cached in the built -in browser opened in the nails',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-06-10T18:51:19.000Z',
    updateDate: '2021-09-17T09:33:24.000Z',
  },
  {
    title: "Promise's five static methods",
    author: 'Big face',
    category: 'JavaScript',
    description: 'Briefly introduce Promise In the class, there is 5 Static method and their usage scenarios',
    content:
      '## 1. Promise.all\n\n Perform multiple execution of multiple Promise, and wait for everything promise All are ready.Treat them.',
    isRecommend: true,
    isPublish: true,
    createDate: '2021-02-22T22:37:06.000Z',
    updateDate: '2021-09-17T09:33:24.000Z',
  },
]

export default [
  {
    url: '/api/posts',
    method: 'get',
    response: (data = {}) => {
      const { title, pageNo, pageSize } = data.query
      let pageData = []
      let total = 60
      const filterData = posts.filter(
        (item) => item.title.includes(title) || (!title && title !== 0)
      )
      if (filterData.length) {
        if (pageSize) {
          while (pageData.length < pageSize) {
            pageData.push(filterData[Math.round(Math.random() * (filterData.length - 1))])
          }
        } else {
          pageData = filterData
        }
        pageData = pageData.map((item, index) => ({
          id: pageSize * (pageNo - 1) + index + 1,
          ...item,
        }))
      } else {
        total = 0
      }
      return {
        code: 0,
        message: 'ok',
        data: {
          pageData,
          total,
          pageNo,
          pageSize,
        },
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 0,
        message: 'ok',
        data: body,
      }
    },
  },
  {
    url: '/api/post/:id',
    method: 'put',
    response: ({ query, body }) => {
      return {
        code: 0,
        message: 'ok',
        data: {
          id: query.id,
          body,
        },
      }
    },
  },
  {
    url: '/api/post/:id',
    method: 'delete',
    response: ({ query }) => {
      return {
        code: 0,
        message: 'ok',
        data: {
          id: query.id,
        },
      }
    },
  },
]
