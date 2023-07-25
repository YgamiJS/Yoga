import schedule from "@/data/schedule.json";
import "swiper/swiper-bundle.css";
import "@/scss/index.scss";

const overlay = document.querySelector(".overlay");
const Headerburger = document.querySelector(".header__burger");
const OverlayBurger = document.querySelector(".overlay__burger");
const OverlayMenu = document.querySelector(".overlay__menu");
const tableBody = document.querySelector(".table-schedule__tbody");
const mounth = document.querySelector(".schedule-header__mounth");
const year = document.querySelector(".schedule-header__year");
const wrapper = document.querySelector(".wrapper");
const goToTop = document.querySelector(".goToTop");
const body = document.body;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.addEventListener("scroll", () => {
  scrollY > 500
    ? goToTop.classList.add("active")
    : goToTop.classList.remove("active");
});

goToTop.addEventListener("click", (event) => {
  event.preventDefault();
  wrapper.scrollIntoView({
    behavior: "smooth",
  });
});

Headerburger.addEventListener("click", () => {
  overlay.classList.toggle("active");
  body.classList.toggle("scroll-hidden");
  overlay.classList.remove("closing");
});

OverlayBurger.addEventListener("click", () => {
  overlay.classList.toggle("active");
  overlay.classList.toggle("closing");
  body.classList.toggle("scroll-hidden");
});

OverlayMenu.addEventListener("click", () => {
  overlay.classList.toggle("active");
  body.classList.toggle("scroll-hidden");
  overlay.classList.toggle("closing");
});

const slider = document.querySelector(".slider");

// Desktop
const notActiveAuthors = document.querySelectorAll(
  ".authors-list__item:not(.active)"
);

notActiveAuthors.forEach((item) => {
  item.addEventListener("click", () => {
    const scrollTarget = item.dataset.scrollTarget;

    const sliderTarget = document.querySelector(
      `[data-target="${scrollTarget}"`
    );

    sliderTarget.scrollIntoView({ block: "center" })
  });
});

//Mobile
const buttonsNavigate = document.querySelectorAll(".authors-list__actions-btn");
const allItemsLength = document.querySelectorAll(".slider__item").length;

buttonsNavigate.forEach((button) => {
  button.addEventListener("click", () => {
    const scrollPercent = Math.floor(slider.scrollWidth / allItemsLength);

    if (button.classList.contains("right")) {
      // right button
      slider.scrollBy(scrollPercent, 0);
    } else if (button.classList.contains("left")) {
      // left button
      const previousPosition = slider.scrollLeft - scrollPercent;

      slider.scrollTo(previousPosition, 0);
    }
  });
});

mounth.textContent = schedule.month;
year.textContent = schedule.year;

const days = [];
const week = 7;

for (let i = 0; i < schedule.days.length; i += week)
  days.push(schedule.days.slice(i, i + week));

tableBody.innerHTML = days
  .map(
    (daysOfWeek) => `
    <tr class="table-schedule__tr-tbody">
        ${daysOfWeek
          .map(
            (dayOfWeek) =>
              `
        <td class="table-schedule__td ${
          dayOfWeek.isWill && dayOfWeek.data.isOffline
            ? "table-schedule__td_offline"
            : "table-schedule__td_online"
        }">
            <span class="table-schedule__td-date">${dayOfWeek.number}</span>
            ${
              dayOfWeek.isWill
                ? `
            <p class="table-schedule__td-time">
                <span class="table-schedule__td-text">
                ${dayOfWeek.data.isOffline ? "йога в группе" : "онлайн занятие"}
                <span class="table-schedule__td-at">${
                  dayOfWeek.data.time
                }</span>
                </span>
            </p>
            `
                : ""
            }
        </td>
        `
          )
          .join("")}
    </tr>
`
  )
  .join("");
