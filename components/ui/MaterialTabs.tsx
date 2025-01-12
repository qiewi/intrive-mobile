import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

type Tab = "integral" | "derivative";

interface MaterialTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const MaterialTabs = ({ activeTab, onTabChange }: MaterialTabsProps) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "integral" && styles.activeTab]}
        onPress={() => onTabChange("integral")}
      >
        <Text style={[styles.tabText, activeTab === "integral" && styles.activeTabText]}>
          Integral
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "derivative" && styles.activeTab]}
        onPress={() => onTabChange("derivative")}
      >
        <Text style={[styles.tabText, activeTab === "derivative" && styles.activeTabText]}>
          Derivative
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 4,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  activeTab: {
    backgroundColor: "#F7CA15",
    borderColor: "#000000",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  activeTabText: {
    fontFamily: "Poppins_600SemiBold",
    color: "black",
  },
});
