const config = {
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      main: '#F5F5F5',
      transparent: 'transparent',
      gray: {
        10: '#1B1B1B',
        20: '#303030',
        30: '#474747',
        40: '#5E5E5E',
        50: '#777777',
        60: '#919191',
        70: '#ABABAB',
        80: '#C6C6C6',
        90: '#E1E1E1',
        95: '#F1F1F1',
        99: '#FBFBFB',
      },
      primary: {
        10: '#0B0424',
        20: '#201060',
        30: '#3A20A2',
        40: '#5C3BE6',
        50: '#7453F9',
        60: '#937BF5',
        70: '#AF9DF4',
        80: '#CABFF5',
        90: '#E4DFFA',
        95: '#F1EEFE',
        99: '#F9F7FD',
      },
      green: {
        10: '#0A1F08',
        20: '#12370F',
        30: '#1A5216',
        40: '#236C1D',
        50: '#2C8825',
        60: '#36A62D',
        70: '#3FC334',
        80: '#7FDA77',
        90: '#BFEDBB',
        95: '#E0F6DF',
        99: '#F7FFF7',
      },
      red: {
        10: '#3B0707',
        20: '#620D0C',
        30: '#8E1211',
        40: '#BA1817',
        50: '#E52928',
        60: '#EC6665',
        70: '#F19090',
        80: '#F6B6B5',
        90: '#FADAD9',
        95: '#FDECEC',
        99: '#FFF8F8 ',
      },
      blue: {
        10: '#001940',
        20: '#002C6F',
        30: '#0040A2',
        40: '#0054D4',
        50: '#0F6EFE',
        60: '#468FFE',
        70: '#76ACFE',
        80: '#A4C8FF ',
        90: '#D1E3FF',
        95: '#E9F2FF',
        99: '#F9FBFF',
      },
    },
  },
}

export type btnColors = 'primary' | 'secondary' | 'tertiary' | 'destructive'

type getColorsReturn = {
  [x in btnColors]: {
    color: string
    bg: string
    border: string
    icon: string
    hover: {
      color?: string
      bg?: string
      border?: string
      icon?: string
    }
    active: {
      color?: string
      bg?: string
      border?: string
      icon?: string
    }
    disabled: {
      color?: string
      bg?: string
      border?: string
      icon?: string
    }
  }
}

const getColors = (): getColorsReturn => ({
  primary: {
    color: config.theme.colors.white,
    icon: config.theme.colors.white,
    bg: config.theme.colors.primary[40],
    border: config.theme.colors.primary[40],
    hover: {
      bg: config.theme.colors.primary[30],
      border: config.theme.colors.primary[30],
    },
    active: {
      bg: config.theme.colors.primary[20],
      border: config.theme.colors.primary[20],
    },
    disabled: {
      bg: config.theme.colors.gray[95],
      border: config.theme.colors.gray[95],
      color: config.theme.colors.gray[60],
    },
  },
  secondary: {
    color: config.theme.colors.gray[20],
    icon: config.theme.colors.gray[60],
    bg: config.theme.colors.white,
    border: config.theme.colors.gray[90],
    hover: {
      bg: config.theme.colors.gray[95],
    },
    active: {
      bg: config.theme.colors.gray[90],
    },
    disabled: {
      bg: config.theme.colors.transparent,
      border: config.theme.colors.gray[95],
      color: config.theme.colors.gray[60],
    },
  },
  tertiary: {
    color: config.theme.colors.blue[40],
    icon: config.theme.colors.blue[40],
    bg: config.theme.colors.transparent,
    border: config.theme.colors.transparent,
    hover: {
      color: config.theme.colors.blue[30],
    },
    active: {
      color: config.theme.colors.blue[20],
    },
    disabled: {
      color: config.theme.colors.gray[60],
    },
  },
  destructive: {
    color: config.theme.colors.white,
    icon: config.theme.colors.white,
    bg: config.theme.colors.red[40],
    border: config.theme.colors.red[40],
    hover: {
      bg: config.theme.colors.red[30],
    },
    active: {
      bg: config.theme.colors.red[20],
    },
    disabled: {
      bg: config.theme.colors.gray[95],
      border: config.theme.colors.gray[95],
      color: config.theme.colors.gray[60],
    },
  },
})

export default getColors