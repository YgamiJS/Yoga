import Swiper, { Navigation } from "swiper";
import schedule from "@/data/schedule.json";
import "swiper/swiper-bundle.css";
import "@/scss/index.scss";

const tableBody = document.querySelector(".table-schedule__tbody");
const mounth = document.querySelector(".schedule-header__mounth");
const year = document.querySelector(".schedule-header__year");

new Swiper(".reviews__swiper", {
  loop: true,
  navigation: {
    nextEl: ".reviews__next-btn",
    prevEl: ".reviews__prev-btn",
  },
  modules: [Navigation],
  on: {
    slideChange: () => {
      const index_currentSlide = this.realIndex;
      const currentSlide = this.slides[index_currentSlide];
    },
  },
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
