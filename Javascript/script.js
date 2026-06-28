function openFeatures() {
    let allElems = document.querySelectorAll(".elem");
    let fullElems = document.querySelectorAll(".fullElem");
    let fullElemsBackBtn = document.querySelectorAll(".fullElem .back");


    allElems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            fullElems[elem.id].style.display = "block";


        })
    })

    fullElemsBackBtn.forEach(function (back) {
        back.addEventListener("click", function () {
            fullElems[back.id].style.display = "none";


        })

    })

}
openFeatures();

function todoList() {
    var currentTasks = [];

    if (localStorage.getItem("currentTasks")) {
        currentTasks = JSON.parse(localStorage.getItem("currentTasks"))
    } else {
        console.log("Task list is empty");

    }



    function renderTask() {

        localStorage.setItem("currentTasks", JSON.stringify(currentTasks));

        let allTask = document.querySelector(".allTask");
        let sum = ''

        currentTasks.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                        <h5>${elem.task} <span class = ${elem.important}>imp</span></h5>
                        <button id = ${idx}>Mark as Completed</button>
                    </div>`
        })

        allTask.innerHTML = sum;

        document.querySelectorAll(".task button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                currentTasks.splice(btn.id, 1);
                renderTask();

            })
        })
    }

    renderTask();

    let form = document.querySelector(".addTask form");
    let taskInput = document.querySelector(".addTask form #task-input")
    let taskDetailsInput = document.querySelector(".addTask form textarea")
    let taskCheckbox = document.querySelector(".addTask form #check")


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        currentTasks.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            important: taskCheckbox.checked
        }
        )
        renderTask();

        taskCheckbox.checked = false;
        taskInput.value = '';
        taskDetailsInput.value = '';
    })
}
todoList();

function dailyPlanner() {
    let wholeDaySum = '';

    let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

    let dayPlanner = document.querySelector(".day-planner");

    let hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)



    hours.forEach(function (elem, idx) {
        let savedData = dayPlanData[idx] || "";
        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
                    <p>${elem} </p>
                    <input id=${idx} type="text" placeholder="..." value = ${savedData}>
                </div>`

    })

    dayPlanner.innerHTML = wholeDaySum;

    let dayPlannerInput = document.querySelectorAll(".day-planner input");


    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener("input", function () {
            dayPlanData[elem.id] = elem.value;

            localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));


        })
    })

}
dailyPlanner();

function motivationQuote() {
    let motivationQuoteContent = document.querySelector(".motivation-2 h1");
    let motivationQuoteAuthor = document.querySelector(".motivation-3 h2");

    async function fetchQuote() {
        let response = await fetch("https://dummyjson.com/quotes/random");
        let data = await response.json();

        motivationQuoteContent.innerHTML = data.quote;
        motivationQuoteAuthor.innerHTML = `- ${data.author}`;

    }

    fetchQuote();
}
motivationQuote();

function pomodoroTimer() {
    let timer = document.querySelector(".pomo-timer h1");
    let startBtn = document.querySelector(".pomo-timer .start-timer");
    let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
    let resetBtn = document.querySelector(".pomo-timer .reset-timer");
    let session = document.querySelector(".pomodoro-timer-fullpage .session")

    isWorkSession = true;

    let totalSeconds = 25 * 60;
    let timerInterval = null;

    function updateTime() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval);

        if (isWorkSession) {

            totalSeconds = 25 * 60;
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTime();
                } else {
                    isWorkSession = false;
                    clearInterval();
                    timer.innerHTML = "05:00";
                    session.innerHTML = "Break";
                    session.style.backgroundColor = 'var(--blue)';

                }
            }, 1000);
        } else {

            totalSeconds = 5 * 60;
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTime();
                } else {
                    isWorkSession = true;
                    clearInterval();
                    timer.innerHTML = "25:00"
                    session.innerHTML = "Work session";
                    session.style.backgroundColor = 'var(--green)';
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        totalSeconds = 25 * 60;
        updateTime();

    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);




}
pomodoroTimer();

function weatherFunctionality() {
    let apikey = "5c26380f11694abe9de143815262706";
    let city = "Mumbai";
    let header1Time = document.querySelector(".header-1 h1");
    let header1Date = document.querySelector(".header-1 h2");

    let header2Temp = document.querySelector(".header-2 h1");
    let header2Condition = document.querySelector(".header-2 h2");
    let header2Precipitation = document.querySelector(".header-2 .precipitation");
    let header2Humidity = document.querySelector(".header-2 .humidity");
    let header2wind = document.querySelector(".header-2 .wind");



    let data = null;

    async function weatherApiCall() {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
        data = await response.json();



        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        header2Precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}°C`
        header2Humidity.innerHTML = `Heat Index: ${data.current.humidity}%`
        header2wind.innerHTML = `Heat Index: ${data.current.wind_kph} km/h`

    }

    weatherApiCall();

    let date = null;
    function timeDate() {
        let totalDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let totalMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        date = new Date();
        let dayOfWeek = totalDayOfWeek[date.getDay()];
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let currDate = date.getDate();
        let month = totalMonths[date.getMonth()];
        let year = date.getFullYear();

        header1Date.innerHTML = `${currDate} ${month} , ${year}`;

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} PM`;
        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} AM`;

        }
    }

    setInterval(() => {
        timeDate();
    }, 1000);
}
weatherFunctionality();

function dailyGoals() {
    let myGoals = JSON.parse(localStorage.getItem("myGoals")) || [
        { id: 1, text: "Workout", xp: 50, completed: false, type: "goal" },
        { id: 2, text: "No Instagram before 11 AM", xp: 80, completed: false, type: "challenge" }
    ];
    let myAchievements = JSON.parse(localStorage.getItem("myAchievements")) || [];


    let todayStats = JSON.parse(localStorage.getItem("todayStats")) || {
        totalAdded: 1,
        totalCompleted: 0
    };

    function checkNewDay() {
        let today = new Date().toDateString();
        let lastUsed = localStorage.getItem("lastUsedDate");

        if (lastUsed && lastUsed !== today) {

            myGoals = [];
            todayStats = { totalAdded: 0, totalCompleted: 0 };

            localStorage.setItem("lastUsedDate", today);
            localStorage.setItem("myGoals", JSON.stringify(myGoals));
            localStorage.setItem("todayStats", JSON.stringify(todayStats));
        } else if (!lastUsed) {
            localStorage.setItem("lastUsedDate", today);
        }
    }

    function updateUI() {
        localStorage.setItem("myGoals", JSON.stringify(myGoals));
        localStorage.setItem("myAchievements", JSON.stringify(myAchievements));
        localStorage.setItem("todayStats", JSON.stringify(todayStats));

        let goalList = document.querySelector(".goal-list");
        let challengeList = document.querySelector(".challenge-list");
        let achievementsList = document.querySelector(".completed-list");
        let completionText = document.querySelector(".completion-fraction");
        let percentageText = document.querySelector(".completion-percentage");

        if (!goalList || !challengeList) return;

        goalList.innerHTML = "";
        challengeList.innerHTML = "";
        achievementsList.innerHTML = "";


        completionText.innerText = todayStats.totalAdded > 0 ?
            `${todayStats.totalCompleted}/${todayStats.totalAdded} Completed` : "0/0 Completed";

        percentageText.innerText = todayStats.totalAdded > 0 ?
            `○ ${Math.round((todayStats.totalCompleted / todayStats.totalAdded) * 100)}%` : "○ 0%";

        myGoals.forEach(g => {
            let li = document.createElement("li");
            li.className = `${g.type === 'goal' ? 'goal-item' : 'challenge-item'} ${g.completed ? 'completed' : ''}`;
            li.innerHTML = `
            <span class="title" onclick="toggleGoal(${g.id})">${g.text}</span>
            <span class="xp">+${g.xp} XP</span>
            <button class="delete-button" onclick="deleteGoal(${g.id})">X</button>
        `;

            if (g.type === 'goal') {
                goalList.appendChild(li);
            } else {
                challengeList.appendChild(li);
            }
        });


        myAchievements.forEach(a => {
            let ach = document.createElement("li");
            ach.className = "completed-item";
            ach.innerHTML = `<strong>${a.text}:</strong> Completed on ${a.date}`;
            achievementsList.appendChild(ach);
        });
    }


    window.toggleGoal = (id) => {
        myGoals = myGoals.map(g => {
            if (g.id === id) {
                let updated = { ...g, completed: !g.completed };

                if (g.type === 'goal') {
                    if (updated.completed) {
                        todayStats.totalCompleted++;
                    } else {
                        todayStats.totalCompleted--;
                    }
                }


                if (updated.completed && !myAchievements.find(a => a.id === id)) {
                    myAchievements.push({ id: g.id, text: g.text, date: new Date().toLocaleDateString() });
                }
                return updated;
            }
            return g;
        });
        updateUI();
    };

    window.deleteGoal = (id) => {

        let goalToDelete = myGoals.find(g => g.id === id);
        if (goalToDelete && goalToDelete.type === 'goal' && !goalToDelete.completed) {
            todayStats.totalAdded--;
        }

        myGoals = myGoals.filter(g => g.id !== id);
        updateUI();
    };


    document.getElementById("add-goal-btn").addEventListener("click", () => {
        let text = prompt("Enter your new goal:");
        if (text) {
            myGoals.push({ id: Date.now(), text, xp: 50, completed: false, type: "goal" });
            todayStats.totalAdded++;
            updateUI();
        }
    });

    document.getElementById("add-challenge-btn").addEventListener("click", () => {
        let text = prompt("Enter your new challenge:");
        if (text) {
            myGoals.push({ id: Date.now(), text, xp: 80, completed: false, type: "challenge" });
            updateUI();
        }
    });

    checkNewDay();
    updateUI();
}
dailyGoals();

function themeLogic() {
    let themeBtn = document.querySelector(".theme");
    let body = document.body;
    let themeText = document.querySelector(".theme h4");

    let savedTheme = localStorage.getItem("dashboardTheme");
    if (savedTheme === "sunset") {
        body.classList.add("sunset-theme");
        themeText.innerText = "Night Mode";
    } else {
        themeText.innerText = "Sunset Mode";
    }

    
    themeBtn.addEventListener("click", () => {
        body.classList.toggle("sunset-theme");
        
    
        if (body.classList.contains("sunset-theme")) {
            localStorage.setItem("dashboardTheme", "sunset");
            themeText.innerText = "Night Mode";
        } else {
            localStorage.setItem("dashboardTheme", "default");
            themeText.innerText = "Sunset Mode";
        }
    });
}
themeLogic();
