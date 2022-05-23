"use strict";

import { fetchAsync } from "./http-request.js";
import {
  HEADLINE_CONTAINER,
  SIDEBAR_CONTAINER,
  MAIN_CONTENTHOLDER,
  SUB_CONTENTHOLDER,
  PORT,
  BASE_URL,
  JSON_DATA_FILE,
  HEADLINE_JSON_DATA_FILE,
  SIDEBAR_JSON_DATA_FILE,
  ROUTES,
} from "./const.js";

document.body.innerHTML = populateBody();

const headlineContainer = document.getElementById(HEADLINE_CONTAINER);
const sidebarContainer = document.getElementById(SIDEBAR_CONTAINER);
const mainContainer = document.getElementById(MAIN_CONTENTHOLDER);
const subContainer = document.getElementById(SUB_CONTENTHOLDER);

function populateBody() {
  return `<div class="container">
      <main>
        <div id="headlines" class="headlines"></div>
        <div class="content-wrapper">
          <section id="section-main" class="section main"></section>
          <section id="section-sub" class="section sub"></section>
        </div>
      </main>
      <div id="sidebar" class="sidebar"></div>
    </div>`;
}

window.onload = () => {
  try {
    /**
     * collectionType - will be part of url query string "id" param
     * collectionId - based on the url fetch the corresponding data
     */
    fetchAsync(JSON_DATA_FILE)
      .then((data) => {
        const params = new URLSearchParams(window.location.search);
        const collectionItem = data.find(
          (item) => params.get("id") === item.collectionType
        );

        //Default view is HOME
        const collectionId = collectionItem
          ? collectionItem.collectionId
          : ROUTES.HOME;

        const dataFile = `/json/${collectionId}.json`;

        fetchAsync(dataFile)
          .then((data) => {
            //Categorization of news can be done based on various params like PublisedDate, UpdatedDate, Type
            //Here its done based on type - hot, recent, article
            if (mainContainer) {
              render(
                data.filter((news) => news.type === "hot"),
                mainContainer,
                populateContent
              );
            }

            if (subContainer) {
              render(
                data.filter((news) => news.type === "recent"),
                subContainer,
                populateContent
              );
              render(
                data.filter((news) => news.type === "article"),
                subContainer,
                populateArticle
              );
            }
          })
          .catch((reason) => {});
      })
      .catch((reason) => {});

    fetchAsync(HEADLINE_JSON_DATA_FILE)
      .then((data) => render(data, headlineContainer, populateHeadline))
      .catch((reason) => {});

    fetchAsync(SIDEBAR_JSON_DATA_FILE)
      .then((data) => render(data, sidebarContainer, populateSideAdBar))
      .catch((reason) => {});
  } catch (error) {}
};

const getImageFullPath = (url) => `${BASE_URL}:${PORT}/${url}`;

/**
 *
 * @param {Array} data - JSON object rcvd by calling api
 * @param {HTMLElement} node - HTML element reference inside which html has to be inserted
 * @param {Function} templateFunction - Corresponding populate template method - Passing function as input
 */
const render = (data, node, templateFunction) => {
  if (data) {
    data.forEach((news) => (node.innerHTML += templateFunction(news)));
  }
};

/**
 *
 * @param {Object} articleObj - News object having Title, Intro, ImageUrl, published, comments
 * @returns each article html content
 */
const populateArticle = (articleObj) => `<div>
    <article>
        <div class="content">
            <h3>
                <a href="javascript:void(0);">
                <img src="/assets/plus.png" alt="plus" class="icon"/>
                ${articleObj.title}
                </a>
            </h3>
            <div class="metadata">
                <ul>
                <li>
                    <span>
                    <span><img class="align-middle" alt="clock" src="https://img.icons8.com/windows/32/000000/clock--v1.png"/></span>
                    <span class="align-middle">${articleObj.published}</span>
                    </span>
                </li>
                </ul>
            </div>
        </div>
        <div class="img ${articleObj.imageSize}">
            <img src="${getImageFullPath(articleObj.imageUrl)}" alt="image" />
        </div>
    </article>
  </div>`;
/**
 *
 * @param {Object} headlinesObj - News object having Title, Intro, ImageUrl, published, comments
 * @returns HTML content
 */
const populateHeadline = (headlinesObj) =>
  `<img src="${getImageFullPath(headlinesObj.imageUrl)}" alt="headline">`;

const populateSideAdBar = (sidebarObj) => `
<picture>
  <source srcset="${getImageFullPath(
    sidebarObj.mobileImageUrl
  )}" media="(max-width: 820px)">
  <img src="${getImageFullPath(sidebarObj.imageUrl)}" alt="sideboard">
</picture>`;

const populateContent = (newsObject) =>
  `<div class="hot-topic">
  <div class="img ${newsObject.imageSize}">
    <img src="${getImageFullPath(newsObject.imageUrl)}" alt="Image" />
  </div>
  <div class="content">
    <div class="description">
      <h1>
        <a href="javascript:void(0);">
          <img src="/assets/plus.png" alt="plus" class="icon">
          ${newsObject.title}
        </a>
      </h1>
      <p>
        ${getHighlightSection(newsObject.highlight)} ${newsObject.intro}
      </p>
    </div>
    <div class="metadata">
      <ul>
        <li>
          <span>
            <span
              ><img
                alt="clock"
                class="align-middle"
                src="https://img.icons8.com/windows/32/000000/clock--v1.png"
            /></span>
            <span class="align-middle">${newsObject.published}</span>
          </span>
        </li>
        ${getCommentSection(newsObject.comments)}
      </ul>
    </div>
  </div>
</div>`;

const getCommentSection = (comments) =>
  comments
    ? `<li>
  <span>
    <span
      ><img alt="comment" class="align-middle" src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/000000/external-comment-communication-royyan-wijaya-detailed-outline-royyan-wijaya.png"/></span>
    <span class="align-middle">${comments}</span>
  </span>
</li>`
    : "";

const getHighlightSection = (highlight) =>
  highlight ? `<span class="highlight">${highlight}</span>` : "";
