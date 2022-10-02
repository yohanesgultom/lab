# Lab

Random experiments deployed as Progressive Web Apps (vue-cli PWA). Check it live at https://lab.gultom.id 

## Setup

Development:

```
docker run -t -d -v $(pwd):/home/app -w /home/app -p 8080:8080 --name lab node:16-buster
docker exec -it lab bash
npm i
npm run serve
```

Production (deployment):

1. Copy `shipitfile.example.js` to `shipitfile.js` and adjust its values ([shipit documentation](https://github.com/shipitjs/shipit))
2. Deploy `npx shipit production deploy`
