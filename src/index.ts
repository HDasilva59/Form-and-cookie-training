import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("public"));

const formParser = express.urlencoded({ extended: true });

app.set("view engine", "njk");

app.get("/", (request, response) => {
  const cookies = cookie.parse(request.get("cookie") || "");
  response.render("home-page", { colorModeCookie: cookies.colorModeCookie });
});

app.post("/add-cookie", formParser, (request, response) => {
  const mode = request.body.Mode;
  const cookies = cookie.parse(request.get("cookie") || "");
  if (mode === "DarkMode") {
    response.set("Set-Cookie", cookie.serialize("colorModeCookie", mode, { maxAge: 667 }));
    response.render("home-page", { colorModeCookie: cookies.colorModeCookie });
  } else {
    response.set("Set-Cookie", cookie.serialize("colorModeCookie", mode, { maxAge: 0 }));
    console.log(request.body);
    response.render("home-page", { colorModeCookie: cookies.colorModeCookie });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
