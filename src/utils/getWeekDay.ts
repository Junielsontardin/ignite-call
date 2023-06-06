enum WeekDays {
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
}

export const getWeekDay = (index: number) => {
    return WeekDays[index]
}
