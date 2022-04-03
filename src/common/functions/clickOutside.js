//Функция для закрытия окон фильтра при клике на любую область кроме headerArea

//elTargetRef - элемент, при клике на который вызовется callback
//callback - функция для вызова, когда пользователь щелкает за пределами возврата

import {onBeforeUnmount, onMounted} from "vue";

export function useClickOutside (elTargetRef, callback) {
    if(!elTargetRef) return

    let listener = (event) => {
        //Если был клик на элемент для открытия окна фильтра (название категории фильтра (напр. Name))
        if(event.target === elTargetRef.value || event.composedPath().includes((elTargetRef.value))) {
            return
        }

        //Если был клик за пределами окна фильтра
        if(typeof callback === 'function') {
            callback()
        }
    }

    onMounted(() => {
        window.addEventListener('click', listener)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('click', listener)
    })

    return {
        listener
    }
}