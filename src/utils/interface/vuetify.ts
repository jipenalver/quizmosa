const themeStorageKey = 'theme'

type ThemeName = 'light' | 'dark'

// Falls back to the system preference until the person picks a theme on this device.
export function getStoredTheme(): ThemeName | 'system' {
  try {
    const stored = localStorage.getItem(themeStorageKey)
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  } catch {
    return 'system'
  }
}

export function storeTheme(theme: ThemeName) {
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // Blocked storage only means the choice is not remembered.
  }
}

export const customTheme = {
  light: {
    dark: false,
    colors: {
      primary: '#E0441D',
      'on-primary': '#FFFFFF',
      secondary: '#17181E',
      'on-secondary': '#FFFFFF',
      background: '#F5F4F0',
      'on-background': '#17181E',
      surface: '#FFFFFF',
      'on-surface': '#17181E',
      muted: '#5B5C66',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#E0441D',
      'on-primary': '#FFFFFF',
      secondary: '#F5F4F0',
      'on-secondary': '#17181E',
      background: '#17181E',
      'on-background': '#FFFFFF',
      surface: '#21222A',
      'on-surface': '#FFFFFF',
      muted: '#B9BAC2',
    },
  },
}

export const customDefaults = {
  VBtn: {
    class: 'text-body-medium font-weight-bold rounded-pill',
  },
  VTextField: {
    variant: 'outlined',
    rounded: 'lg',
    color: 'primary',
  },
  VAutocomplete: {
    variant: 'outlined',
    rounded: 'lg',
    color: 'primary',
  },
  VSelect: {
    variant: 'outlined',
    rounded: 'lg',
    color: 'primary',
  },
  VCombobox: {
    variant: 'outlined',
    rounded: 'lg',
    color: 'primary',
  },
  VFileInput: {
    variant: 'outlined',
    rounded: 'lg',
    color: 'primary',
  },
  VDateInput: {
    variant: 'outlined',
    rounded: 'lg',
    color: 'primary',
  },
  VTextarea: {
    variant: 'outlined',
    rounded: 'lg',
    color: 'primary',
  },
  VCard: {
    elevation: 0,
    rounded: 'xl',
  },
}
