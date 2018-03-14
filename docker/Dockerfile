FROM node:6-slim

# Install Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.23.3
ENV PATH /root/.yarn/bin:$PATH

ADD app/views /views
ADD app/server.js .
ADD app/demo3.js .
ADD app/package.json .
RUN yarn install

ADD notes notes

EXPOSE 3000
CMD yarn start