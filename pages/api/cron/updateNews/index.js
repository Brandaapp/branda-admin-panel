import dbConnect from "../../../../utils/dbConnect";
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
import News from "../../../../models/News";

dbConnect();

export default (req, res) => {
   return new Promise(resolve => {
        if (req.method === 'PATCH') {
            const result = axios.get("https://www.brandeis.edu/");
            result
                .then((result) => {
                    let out = [];
                    const $ = cheerio.load(result.data);
                    $("div.hero__wrap.wrap > a").each(function(i, element) {
                        let link = $(element).attr("href");
                        let title = $(element).children().first().text();
                        out.push({ link: link, headline: title });
                    });

                    $("div.hero__image > img").each(function(i, element) {
                        out[i].image = "https://brandeis.edu/" + $(element).attr("src");
                    });

                    $("div.grid__item.grid__item--4.grid__item--space > a").each(function(
                        i,
                        element
                    ) {
                        let link = $(element)
                            .attr("href")
                            .replace(/^https?:/, "");
                        let title = $(element).find("p").text();
                        let img = $(element).find("img").attr("src");
                        out.push({
                            link: "https:" + link,
                            headline: title,
                            image: "https:" + img,
                        });
                    });
                    return out;
                })
                .then((out) => {
                    let links = out.map((x) => axios.get(x.link));
                    links.map((p) => p.catch((e) => e));
                    Promise.allSettled(links)
                        .then(function(result) {
                            result.forEach(function(element, i) {
                                if (element.status === "rejected") {
                                    out = out.filter((element) => element !== out[i]);
                                }
                            });
                            return out;
                        })
                        .then((out) => {
                            let links = out.map((x) => axios.get(x.link));
                            Promise.all(links).then(function(result) {
                                for (let i = 0; i < result.length; i += 1) {
                                    const $ = cheerio.load(result[i].data);
                                    const fallbackDate = moment().format("MMM. DD, YYYY");
                                    let linkArr = result[i].config.url
                                        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                                        .split(".");
                                    let subDomain = linkArr[0].toLowerCase();
                                    let date;
                                    let cat;

                                    if (subDomain === "brandeis") {
                                        let section = linkArr[1].split("/")[1].toLowerCase();
                                        if (section === "now") {
                                            date = $("span.date").text();
                                            cat = $("#story-categories")
                                                .children()
                                                .children()
                                                .first()
                                                .text();
                                        } else if (section === "global") {
                                            date = $("p.date-byline").text();
                                            date = date.substring(0, date.indexOf("|") - 1);
                                            date = moment(date, "MMMM DD, YYYY").format("MMM. DD, YYYY");
                                            cat = "Global";
                                        } else if (section === "magazine") {
                                            date = fallbackDate;
                                            cat = "Magazine";
                                        } else if (section === "health") {
                                            date = fallbackDate;
                                            cat = "Health";
                                        }
                                    } else if (subDomain === "heller") {
                                        date = fallbackDate;
                                        cat = $("#section-nav").children().children().first().text();
                                    } else {
                                        date = fallbackDate;
                                        cat = "Other";
                                    }

                                    if (!moment(date, "MMM. DD, YYYY").isValid) {
                                        date = fallbackDate;
                                    }

                                    if (cat === "" || !cat || cat.length < 2) {
                                        cat = "Other";
                                    }

                                    out[i].id = i + 1;
                                    out[i].date = date;
                                    out[i].category = cat;
                                }
                                News.collection.drop();
                                let ok = true;
                                // later TODO: rewrite with Promise.all
                                for (let i = 0; i < out.length; i += 1) {
                                    if (ok) {
                                        News.create({
                                                id: out[i].id,
                                                headline: out[i].headline,
                                                link: out[i].link,
                                                date: out[i].date,
                                                category: out[i].category,
                                                image: out[i].image,
                                            },
                                            (err, doc) => {
                                                if (err) {
                                                    // later TODO: log
                                                    ok = false;
                                                }
                                            }
                                        );
                                    }
                                }
                                res.status(200).send(out.length + " news articles fetched and saved.");
                                resolve();
                            });
                        })
                        .catch((error) => {
                            res.status(500).send("Error fetching news: " + error);
                            resolve();
                        });
                })
                .catch((error) => {
                    res.status(500).send("Error fetching news: " + error);
                    resolve();
                });
        } else {
            res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
            resolve();
        }
   });
};