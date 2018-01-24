# Dontalk

Dontalk is a Dontpad-like application which lets you use URLs to create and join chats that look like a Unix terminal.

It's continuously deployed on [https://dontalk.herokuapp.com/](https://dontalk.herokuapp.com/)

### Contribution guide
**Requirements:**
- [Node 6+](https://nodejs.org/en/download/)
- [Mongo](https://docs.mongodb.com/manual/installation/)

**Step-by-step:**  
```shell
# Start mongo service
sudo service mongod start

# Install dependencies
npm install

# Run on developer mode
npm run dev
``` 

The application will run on [http://localhost:1234/](http://localhost:1234/)