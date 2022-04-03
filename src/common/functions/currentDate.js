//Функция для получения текущей даты в формате "дд.мм.гггг"

export const useCurrentDate = () => {
    let currentDate = new Date()
    const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()
    const month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
    const year = currentDate.getFullYear()

    return `${day}.${month}.${year}`
}