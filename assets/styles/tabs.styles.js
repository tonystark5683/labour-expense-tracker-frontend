import { COLORS } from "../../constants/colors";

export const tabStyles = {
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    margin: 16,
    marginTop: 0,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 8,
  },
  activeTab: {
    backgroundColor: COLORS.background,
  },
  tabText: {
    color: COLORS.textLight,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
  },
};