import React, { useState, useRef, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    Dimensions,
    Platform,
} from "react-native";
import { TextInput } from "react-native-paper"; // Import TextInput dari react-native-paper
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemeContext } from "@/components/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function FormScreen() {
    const { theme } = useContext(ThemeContext);
    const backgroundColor = theme === 'dark' ? Colors.dark.background : Colors.light.background;
    const textSearchColor = theme === 'dark' ? Colors.dark.text : Colors.light.text; // Text color for dark mode

    const [currentStep, setCurrentStep] = useState(1);
    const [orders, setOrders] = useState([{ orderName: "", quantity: "", vendorName: "", installationLocation: "", ulp: "" }]);
    const [formData, setFormData] = useState({
        title: "",
        krNumber: "",
        pkwoNumber: "",
        plnUps: "",
        deadline: "",
        companyName1: "",
        address1: "",
        representedBy1: "",
        actingAs1: "",
        companyName2: "",
        address2: "",
        representedBy2: "",
        actingAs2: "",
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [showNewOrderForm, setShowNewOrderForm] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;

    const handleInputChange = (name, value, index) => {
        if (index !== undefined) {
            const updatedOrders = [...orders];
            updatedOrders[index][name] = value;
            setOrders(updatedOrders);
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
    const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
    const toggleDatePicker = () => setDatePickerVisibility((prev) => !prev);
    const handleConfirm = (date) => {
        handleInputChange("deadline", date.toLocaleDateString());
        toggleDatePicker();
    };

    const addNewOrder = () => {
        const newOrder = { orderName: "", quantity: "", vendorName: "", installationLocation: "", ulp: "" };
        setOrders((prevOrders) => [...prevOrders, newOrder]);
        setShowNewOrderForm(false);
        slideAnim.setValue(height);
    };

    const cancelNewOrder = () => {
        setShowNewOrderForm(false);
        slideAnim.setValue(height);
    };

    const deleteOrder = (index) => setOrders(orders.filter((_, i) => i !== index));


    const router = useRouter(); // Initialize router for navigation

    // Navigate to the static address-detail page
    const navigateToAddressDetail = () => {
        router.push("/employee/address-detail"); // Static navigation
    };
    
    const renderFormInputGroup = (inputs) =>
        inputs.map((input, index) => (
            input.name.includes("address") ? (
                <TouchableOpacity
                    key={index}
                    style={styles.input}
                    onPress={navigateToAddressDetail} 
                >
                    <View className="border-[1px] p-3 border-[gray-400] rounded-lg flex-row justify-between items-center">
                        <ThemedText className="font-oregular">{input.value || input.placeholder}</ThemedText>
                        <Ionicons name="chevron-forward-outline" size={24} color="gray" />
                    </View>
                </TouchableOpacity>
            ) : (
                <TextInput
                    key={index}
                    label={<ThemedText className="font-oregular">{input.placeholder}</ThemedText>}
                    value={input.value}
                    onChangeText={(text) => handleInputChange(input.name, text, input.index)}
                    style={styles.input}
                    mode="outlined"
                    contentStyle={{ fontFamily: "Outfit-Regular", color: textSearchColor }}
                    theme={{
                        colors: { placeholder: '#aaa', primary: '#23ACE3', background: backgroundColor },
                        roundness: 10,
                        fonts: { regular: { fontFamily: 'Outfit-Regular' } }
                    }}
                />
            )
        ));

    const renderFormContent = () => {
        const stepInputs = [
            // Step 1 Inputs
            [
                { placeholder: "Judul Berita Acara", value: formData.title, name: "title" },
                { placeholder: "Nomor KR", value: formData.krNumber, name: "krNumber" },
                { placeholder: "Nomor PK/WO", value: formData.pkwoNumber, name: "pkwoNumber" },
                { placeholder: "PLN UP3", value: formData.plnUps, name: "plnUps" },
            ],
            // Step 2 Inputs
            [
                { placeholder: "Nama Perusahaan (Pihak Pertama)", value: formData.companyName1, name: "companyName1" },
                { placeholder: "Alamat", value: formData.address1, name: "address1" },
                { placeholder: "Diwakili Oleh", value: formData.representedBy1, name: "representedBy1" },
                { placeholder: "Bertindak Sebagai", value: formData.actingAs1, name: "actingAs1" },
            ],
            // Step 3 Inputs
            [
                { placeholder: "Nama Perusahaan (Pihak Kedua)", value: formData.companyName2, name: "companyName2" },
                { placeholder: "Alamat", value: formData.address2, name: "address2" },
                { placeholder: "Diwakili Oleh", value: formData.representedBy2, name: "representedBy2" },
                { placeholder: "Bertindak Sebagai", value: formData.actingAs2, name: "actingAs2" },
            ],
            // Step 4 Inputs
            [
                { placeholder: "Nama Pesanan", value: orders[0].orderName, name: "orderName", index: 0 },
                { placeholder: "Jumlah", value: orders[0].quantity, name: "quantity", index: 0, keyboardType: "numeric" },
                { placeholder: "Nama Vendor", value: orders[0].vendorName, name: "vendorName", index: 0 },
                { placeholder: "Lokasi Pemasangan", value: orders[0].installationLocation, name: "installationLocation", index: 0 },
                { placeholder: "ULP", value: orders[0].ulp, name: "ulp", index: 0 },
            ],
        ];

        // Check if we're on the summary step (step 5)
        if (currentStep === 5) {
            return renderSummary(); // Render the summary when on step 5
        }

        // Render the form for steps 1-4
        return (
            <>
                {renderFormInputGroup(stepInputs[currentStep - 1])}
                {currentStep === 1 && (
                    <TouchableOpacity style={styles.input} onPress={toggleDatePicker}>
                        <View className="flex-row justify-between items-center">
                            <ThemedText className="font-oregular">{formData.deadline || "Deadline Pesanan"}</ThemedText>
                            <Ionicons name="calendar-outline" size={24} color="#000" />
                        </View>
                    </TouchableOpacity>
                )}
            </>
        );
    };



    const renderSummary = () => (
        <View style={styles.summaryContainer}>
            <ThemedText className="font-obold">Ringkasan Pesanan</ThemedText>
            {orders.map((order, index) => (
                <View key={index} style={styles.summaryBox}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteOrder(index)}>
                        <Ionicons name="close-circle-outline" size={24} color="red" />
                    </TouchableOpacity>
                    <ThemedText className="font-oregular">Judul Berita Acara: {formData.title}</ThemedText>
                    <ThemedText className="font-oregular">Nomor PK/WO: {formData.pkwoNumber}</ThemedText>
                    <ThemedText className="font-oregular">Nama Pesanan: {order.orderName}</ThemedText>
                    <ThemedText className="font-oregular">Jumlah: {order.quantity}</ThemedText>
                    <ThemedText className="font-oregular">Lokasi Pemasangan: {order.installationLocation}</ThemedText>
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1, backgroundColor }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <ThemedText className="font-oregular">{`${currentStep} of 5`}</ThemedText>
                </View>

                <View className="mb-4">
                    {currentStep === 1 && (
                        <View>
                            <View className="flex-row">
                                <ThemedText className="text-3xl font-obold">Yuk, </ThemedText>
                                <ThemedText className="text-3xl font-obold text-originblue">isi detail </ThemedText>
                                <ThemedText className="text-3xl font-obold">berita </ThemedText>
                            </View>
                            <ThemedText className="text-3xl font-obold">acara di sini!</ThemedText>
                        </View>
                    )}
                    {currentStep === 2 && (
                        <View>
                            <ThemedText className="text-3xl font-obold">Isi detail pihak</ThemedText>
                            <View className="flex-row">
                                <ThemedText className="text-3xl font-obold text-originblue">pertama </ThemedText>
                                <ThemedText className="text-3xl font-obold">di sini!</ThemedText>
                            </View>
                        </View>
                    )}
                    {currentStep === 3 && (
                        <View>
                            <ThemedText className="text-3xl font-obold">Isi detail pihak</ThemedText>
                            <View className="flex-row">
                                <ThemedText className="text-3xl font-obold text-originblue">kedua </ThemedText>
                                <ThemedText className="text-3xl font-obold">di sini!</ThemedText>
                            </View>
                        </View>
                    )}
                    {currentStep === 4 && (
                        <View>
                            <View className="flex-row">
                                <ThemedText className="text-3xl font-obold">Yuk, </ThemedText>
                                <ThemedText className="text-3xl font-obold text-originblue">isi detail</ThemedText>
                            </View>
                            <ThemedText className="text-3xl font-obold">pesanan di sini!</ThemedText>
                        </View>
                    )}
                    {currentStep === 5 && (
                        <View>
                            <ThemedText className="text-3xl font-obold">Ringkasan Pesanan</ThemedText>
                        </View>
                    )}
                </View>

                <View style={styles.formContainer}>{renderFormContent()}</View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={currentStep === 5 ? () => alert("Form submitted!") : handleNext}
                >
                    <ThemedText className="font-oregular text-lg text-white">{currentStep === 5 ? "Selesaikan Pesanan" : "Lanjutkan"}</ThemedText>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={toggleDatePicker}
                    display={Platform.OS === "ios" ? "inline" : "default"}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

// Styles remain the same but backgroundColor is dynamic now.
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        flexGrow: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: height * 0.03,
        position: "relative",
    },
    backButton: { position: "absolute", left: 0 },
    input: {
        marginBottom: height * 0.02,
        width: "100%",
    },
    button: {
        backgroundColor: "#1D8DF7",
        paddingVertical: height * 0.02,
        borderRadius: 8,
        alignItems: "center",
        marginTop: height * 0.03,
        width: "100%",
    },
    summaryContainer: { marginVertical: height * 0.02 },
    summaryBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 15,
        marginBottom: height * 0.02,
        backgroundColor: "#f9f9f9",
        position: "relative",
    },
    deleteButton: { position: "absolute", top: 10, right: 10 },
});