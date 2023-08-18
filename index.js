import kanban from "./kanban.js";
const todo = document.querySelector(".cmp-kanbanApp__container__kanban__taskbox__cards.cmp-kanbanApp__container__kanban__taskbox__title--todo");

const pending = document.querySelector(".cmp-kanbanApp__container__kanban__taskbox__cards.cmp-kanbanApp__container__kanban__taskbox__title--pending");

const completed = document.querySelector(".cmp-kanbanApp__container__kanban__taskbox__cards.cmp-kanbanApp__container__kanban__taskbox__title--completed");

const taskbox = [todo, pending, completed];

function addTaskCard(task, index) {
    const element = document.createElement("form");
    element.className = "cmp-kanbanApp__container__kanban__taskbox__cards__card";
    element.draggable = true;
    element.dataset.id = task.taskId;
    element.innerHTML = `<input value="${task.content}" type="text" name="task" autocomplete="off" disabled="disabled">
    <div class="cmp-kanbanApp__container__kanban__taskbox__cards__card__division">
        <span class="cmp-kanbanApp__container__kanban__taskbox__cards__card__division--taskid">#${task.taskId}</span>
        <span class="cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons">
            <button class="cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--edit" data-id="${task.taskId}"><i class="fa-solid fa-pencil"></i></button>
            <button class="cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--update cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--hide" data-id="${task.taskId}" data-column="&{index}"><i class="fa-solid fa-check"></i></button>
            <button class="cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--delete" data-id="${task.taskId}"><i class="fa-solid fa-trash-can"></i></button>                                                                                                                      
        </span>
    </div>`;
    taskbox[index].appendChild(element);
}

kanban.getAllTasks().forEach((tasks, index) => {
    tasks.forEach(task => {
        addTaskCard(task, index);
    });
});
const addForm = document.querySelectorAll(".cmp-kanbanApp__container__kanban__taskbox__add");
addForm.forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        if(form.task.value){
            const task = kanban.insertTask(form.submit.dataset.id, form.task.value.trim());
            addTaskCard(task, form.submit.dataset.id);
            form.reset();
        }        
    });
});
taskbox.forEach(column => {
    column.addEventListener("click", event => {
        event.preventDefault();
        const formInput = event.target.parentElement.parentElement.previousElementSibling;
        if(event.target.classList.contains("cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--edit")){
            formInput.removeAttribute("disabled");
            event.target.classList.add("cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--hide");
            event.target.nextElementSibling.classList.remove("cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--hide");
        }
        if(event.target.classList.contains("cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--update")){
            formInput.setAttribute("disabled", "disabled");
            event.target.classList.add("cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--hide");
            event.target.previousElementSibling.classList.remove("cmp-kanbanApp__container__kanban__taskbox__cards__card__division__icons--hide");
            const taskId = event.target.dataset.id;
            const columnId = event.target.dataset.column;
            const content = formInput.value;
            kanban.updateTask(taskId, {
                columnId: columnId,
                content: content
            });
        }
    });
});
