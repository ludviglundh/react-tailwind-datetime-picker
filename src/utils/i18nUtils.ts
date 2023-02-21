export const loadI18n = (language = 'en'): void => {
  switch (language) {
    case 'sv':
      import('dayjs/locale/sv')
      break

    default:
      import('dayjs/locale/en')
  }
}
