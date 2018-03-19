
WIP

---

This basic server allows to render markdown files in html, packaged into a docker<br/>
Useful when your notes contain images or mathematical stuff<br/>

---

Basic usage for local use:

1 - build the docker with `make docker` <br/>
2 - up it with `make up_server` <br/>
3 - open your browser at `localhost:3000` <br/>

---

To use an external notes folder<br/>
Mount whatever volume you like in docker/docker-compose.yml

---

Current limitations:<br/>

- You can't have a note file containing a dash (-)

---

Kudos to [mathjax](https://www.mathjax.org/) and [markdown-it](https://github.com/markdown-it/markdown-it)!