new Vue({
  el: '#app',
  data: {
    chat: '',
    chatToJoin: '',
    messages: [],
    newMessage: {
      chat: '',
      author: '',
      content: ''
    },
    page: 1,
    pages: 0
  },
  methods: {
    postMessage: function () {
      if (this.newMessage.content != '') {
        const message = {
          chat: this.newMessage.chat,
          author: this.newMessage.author,
          content: this.newMessage.content,
        };
        this.newMessage.content = '';
        this.$http.post('/api/messages', { message: message })
        .then(function (response) {
          this.getMessages();
        });
      }
    },
    getMessages: function (page = 1) {
      if (this.messages && this.messages.length > 0) {
        const lastMessageId = this.messages[this.messages.length-1]._id;
      }
      this.page = page;
      this.$http.get(`/api/messages/${this.chat}/${page}`)
        .then(function (response) {
          this.messages = response.body.docs.slice().reverse();
          this.pages = response.body.pages;
          if (this.messages[this.messages.length-1]._id != lastMessageId) {
            this.playSound();
          }
        });
    },
    saveUser: function () {
      localStorage.setItem('username', this.newMessage.author)
    },
    joinChat: function () {
      window.location = this.chatToJoin;
    },
    playSound: function(event) {
      this.$refs.audioElm.play();
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('HH:mm');
    }
  },
  mounted: function () {
    this.chat = window.location.pathname.replace('/', '');
    this.newMessage.chat = this.chat;
    this.newMessage.author = localStorage.getItem('username') || 'Anonymous';
    
    if (!this.chat) return;
    
    this.getMessages();
    setInterval(() => {
      if (this.page === 1) this.getMessages();
    }, 3000);
  }
});
