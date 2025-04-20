let currentYear;
let currentMonth;
let schedules = {};

function printCalendar(year, month) {
    const today = new Date();
    const isTodayMonth = today.getFullYear() === year && today.getMonth() === month;

    let startDay = new Date(year, month, 1);
    let yoil = startDay.getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();

    let data = `<h3>${year}년 ${month + 1}월</h3>`;
    data += `<div class="nav-buttons">
                <button onclick="changeMonth(-1)">이전달</button>
                <button onclick="changeMonth(1)">다음달</button>
             </div>`;
    data += "<table>";
    data += "<tr>";
    data += "<th>일</th>";
    data += "<th>월</th>";
    data += "<th>화</th>";
    data += "<th>수</th>";
    data += "<th>목</th>";
    data += "<th>금</th>";
    data += "<th>토</th>";
    data += "</tr>";

    data += "<tr>";


    for (let i = 0; i < yoil; i++) {
        data += "<td>&nbsp;</td>";
    }

    for (let i = 1; i <= lastDate; i++) {
        let classes = "";
        if (isTodayMonth && i === today.getDate()) {
            classes = "today";
        }


        if ((i + yoil) % 7 === 1) {
            classes += " weekend-sunday"; // 일요일
        } else if ((i + yoil) % 7 === 0) {
            classes += " weekend-saturday"; // 토요일
        }


        data += `<td class="${classes}" onclick="openScheduleInput(${i})">${i}`;


        if (schedules[`${year}-${month + 1}-${i}`]) {
            data += `<div class="schedule" onclick="showSchedule(${i})">${schedules[`${year}-${month + 1}-${i}`]}</div>`;
        }

        data += "</td>";

        if ((i + yoil) % 7 === 0 && i !== lastDate) {
            data += "</tr><tr>";
        }
    }

    data += "</tr>";
    data += "</table>";
    document.getElementById("main").innerHTML = data;
}

// 월 변경
function changeMonth(n) {
    currentMonth += n;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    printCalendar(currentYear, currentMonth);
}

// 일정 입력
function openScheduleInput(date) {
    const scheduleText = prompt("일정을 입력하세요:", schedules[`${currentYear}-${currentMonth + 1}-${date}`] || "");
    if (scheduleText !== null) {
        addSchedule(date, scheduleText);
    }
}

// 일정 추가
function addSchedule(date, scheduleText) {
    const key = `${currentYear}-${currentMonth + 1}-${date}`;
    schedules[key] = scheduleText;
    printCalendar(currentYear, currentMonth);
}

// 일정 보기 및 팝업창 열기
function showSchedule(date) {
    const key = `${currentYear}-${currentMonth + 1}-${date}`;
    const schedule = schedules[key] || "일정이 없습니다.";

    const popup = window.open("", "Schedule", "width=400,height=500");
    popup.document.write(`<h3>${currentYear}년 ${currentMonth + 1}월 ${date}일</h3>`);
    popup.document.write(`<p>${schedule}</p>`);
}

window.onload = function() {
    let today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    printCalendar(currentYear, currentMonth);
}
