import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#4f46e5',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    borderRadius: 10,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    fontSize: 15,
  },
  components: {
    Button: {
      controlHeightLG: 52,
      borderRadiusLG: 14,
      fontSizeLG: 17,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 16,
      paddingLG: 24,
    },
    Progress: {
      defaultColor: '#4f46e5',
      remainingColor: '#e2e8f0',
    },
  },
};
