FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache dumb-init
COPY . .

# Install API
WORKDIR /app/api
RUN npm install --production

# Install Next.js deps
WORKDIR /app/web
RUN npm install

# SKIP BUILD for now - will build at runtime
WORKDIR /app
RUN mkdir -p /app/api/data
RUN npm init -y && npm install http-proxy

# Runtime script that builds AFTER API starts
RUN cat > /app/start.sh << 'EOF'
#!/bin/sh
cd /app/api && PORT=4001 node server.js &
sleep 3
cd /app/web
[ ! -d ".next" ] && npm run build
PORT=3001 npm start &
sleep 3
node -e "
const http=require('http'),httpProxy=require('http-proxy');
const proxy=httpProxy.createProxy();
http.createServer((req,res)=>{
  proxy.web(req,res,{target:req.url.startsWith('/api')?'http://localhost:4001':'http://localhost:3001'})
}).listen(7860,'0.0.0.0',()=>console.log('Ready on :7860'))
"
EOF

RUN chmod +x /app/start.sh
ENV NODE_ENV=production PORT=7860
EXPOSE 7860
CMD ["dumb-init", "--", "sh", "/app/start.sh"]