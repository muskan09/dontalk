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
    lastMessageId: '',
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
          this.playSoundSend();
          this.getMessages();
        });
      }
    },
    getMessages: function (page = 1) {
      this.page = page;
      this.$http.get(`/api/messages/${this.chat}/${page}`)
        .then(function (response) {
          this.messages = response.body.docs.slice().reverse();
          this.pages = response.body.pages;
          var lastMessage = this.messages[this.messages.length-1];
          if (lastMessage && lastMessage._id != this.lastMessageId && lastMessage.author != this.newMessage.author) {
            this.playSoundReceive();
          }
          this.lastMessageId = lastMessage._id;
        });
    },
    saveUser: function () {
      localStorage.setItem('username', this.newMessage.author)
    },
    joinChat: function () {
      window.location = this.chatToJoin;
    },
    playSoundReceive: function(event) {
      this.$refs.audioReceive.play();
    },
    playSoundSend: function(event) {
      this.$refs.audioSend.play();
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
