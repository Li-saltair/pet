export default {
  pages: [  
    'pages/home/note-detail', 
    'pages/release/index', 
    'pages/index/index',
    'pages/user/index',
    'pages/release/space',
    'pages/login/index',
    'pages/home/search',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    onReachBottomDistance:120,
  },
  tabBar:{
    custom: true,
    color: "#333",
    selectedColor: "#f60",
    background:'#fff',
    list: [{
      pagePath: "pages/index/index",
      iconPath: "assets/img/home.png",
      selectedIconPath: "assets/img/home-a.png",
      text: "首页"
    },{
      pagePath: "pages/release/space",
      iconPath: "assets/img/add.png",
      selectedIconPath: "assets/img/add-a.png",
      text: "发布"
    }, {
      pagePath: "pages/user/index",
      iconPath: "assets/img/user.png",
      selectedIconPath: "assets/img/user-a.png",
      text: "我的"
    }]
  }
}
