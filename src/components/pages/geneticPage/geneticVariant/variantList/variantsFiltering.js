export const useVariantsFiltering = (variantsStart, filterParams) => {

    //Деструктуризация параметров фильтрации
    let {name, significance, genotype, HGWStype, HGWSname} = filterParams

    //Объявление отфильтрованного массива вариантов
    let filteredVariants = []

    //Реализация последовательной фильтрации

    //Нерегистрозависимая Фильтрация по имени варианта
    //Если что-то введено в параметр, то происходит поиск по совпадению подстрок и вывод соответсвующих варинтов
    //Иначе (если ничего не введено) возвращаются все варианты
    filteredVariants = variantsStart.filter(item => name ? item.alleleName.toLowerCase().includes(name.toLowerCase()) : item)

    //Фильтрация по чекбоксу значимости варианта
    //Если в массиве значимости есть значение(я), то возвращаются варианты, которые содрежат эти значения
    //Иначе (если ничего не выбрано) возвращаются все варианты
    filteredVariants = filteredVariants.filter(item => significance ? significance.split(",").includes(item.significance) : item)

    //Фильтрация по генотипу варианта
    //Если выбранный параметр генотипа соответсвует параметру варианта, то возращаются эти варианты
    //Если выбран параметр 'ALL', то возвращаются все варианты
    filteredVariants = filteredVariants.filter(item => genotype !== "ALL" ? item.genotype === genotype : item)

    //Нерегистрозависимая фильтрация по типу и названию HGWS
    //Возращаются варианты, которые соответствуют выбранному типу и включают в себя введённую пользователем подстроку названия
    //Изначально при отсутсвии введённых параметров, используются начальные варианты, при которых возвращаются все варианты
    filteredVariants = filteredVariants.filter(item => item.hgvs[HGWStype].toLowerCase().includes(HGWSname.toLowerCase()))

    return filteredVariants
}