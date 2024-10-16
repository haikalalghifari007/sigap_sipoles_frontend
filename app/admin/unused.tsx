import React, { useState, useRef } from "react";
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

const { width, height } = Dimensions.get("window");

export default function FormScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orders, setOrders] = useState([
    {
      orderName: "",
      quantity: "",
      vendorName: "",
      installationLocation: "",
      ulp: "",
    },
  ]);
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
    const newOrder = {
      orderName: orders[1]?.orderName || "",
      quantity: orders[1]?.quantity || "",
      vendorName: orders[1]?.vendorName || "",
      installationLocation: orders[1]?.installationLocation || "",
      ulp: orders[1]?.ulp || "",
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setShowNewOrderForm(false);
    slideAnim.setValue(height);
  };

  const cancelNewOrder = () => {
    setShowNewOrderForm(false);
    slideAnim.setValue(height); // Reset animasi
  };

  const deleteOrder = (index) =>
    setOrders(orders.filter((_, i) => i !== index));

  const renderFormInputGroup = (inputs) =>
    inputs.map((input, index) => (
      <TextInput
        key={index}
        label={input.placeholder} // Menggunakan label untuk TextInput
        value={input.value}
        onChangeText={(text) =>
          handleInputChange(input.name, text, input.index)
        }
        style={styles.input}
        mode="outlined" // Mengatur mode menjadi outlined
        placeholderTextColor="#aaa"
      />
    ));

  const renderFormContent = () => {
    if (currentStep === 5) return renderSummary();

    const stepInputs = [
      [
        {
          placeholder: "Judul Berita Acara",
          value: formData.title,
          name: "title",
        },
        { placeholder: "Nomor KR", value: formData.krNumber, name: "krNumber" },
        {
          placeholder: "Nomor PK/WO",
          value: formData.pkwoNumber,
          name: "pkwoNumber",
        },
        { placeholder: "PLN UP3", value: formData.plnUps, name: "plnUps" },
      ],
      [
        {
          placeholder: "Nama Perusahaan (Pihak Pertama)",
          value: formData.companyName1,
          name: "companyName1",
        },
        { placeholder: "Alamat", value: formData.address1, name: "address1" },
        {
          placeholder: "Diwakili Oleh",
          value: formData.representedBy1,
          name: "representedBy1",
        },
        {
          placeholder: "Bertindak Sebagai",
          value: formData.actingAs1,
          name: "actingAs1",
        },
      ],
      [
        {
          placeholder: "Nama Perusahaan (Pihak Kedua)",
          value: formData.companyName2,
          name: "companyName2",
        },
        { placeholder: "Alamat", value: formData.address2, name: "address2" },
        {
          placeholder: "Diwakili Oleh",
          value: formData.representedBy2,
          name: "representedBy2",
        },
        {
          placeholder: "Bertindak Sebagai",
          value: formData.actingAs2,
          name: "actingAs2",
        },
      ],
      [
        {
          placeholder: "Nama Pesanan",
          value: orders[0].orderName,
          name: "orderName",
          index: 0,
        },
        {
          placeholder: "Jumlah",
          value: orders[0].quantity,
          name: "quantity",
          index: 0,
          keyboardType: "numeric",
        },
        {
          placeholder: "Nama Vendor",
          value: orders[0].vendorName,
          name: "vendorName",
          index: 0,
        },
        {
          placeholder: "Lokasi Pemasangan",
          value: orders[0].installationLocation,
          name: "installationLocation",
          index: 0,
        },
        { placeholder: "ULP", value: orders[0].ulp, name: "ulp", index: 0 },
      ],
    ];

    return (
      <>
        {renderFormInputGroup(stepInputs[currentStep - 1])}
        {currentStep === 1 && (
          <TouchableOpacity style={styles.input} onPress={toggleDatePicker}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateText}>
                {formData.deadline || "Deadline Pesanan"}
              </Text>
              <Ionicons name="calendar-outline" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Ringkasan Pesanan</Text>
      {orders.map((order, index) => (
        <View key={index} style={styles.summaryBox}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteOrder(index)}
          >
            <Ionicons name="close-circle-outline" size={24} color="red" />
          </TouchableOpacity>
          <Text style={styles.summaryItem}>
            <Text style={styles.summaryHeader}>Judul Berita Acara:</Text>{" "}
            {formData.title}
          </Text>
          <Text style={styles.summaryItem}>
            <Text style={styles.summaryHeader}>Nomor PK/WO:</Text>{" "}
            {formData.pkwoNumber}
          </Text>
          <Text style={styles.summaryItem}>
            <Text style={styles.summaryHeader}>Nama Pesanan:</Text>{" "}
            {order.orderName}
          </Text>
          <Text style={styles.summaryItem}>
            <Text style={styles.summaryHeader}>Jumlah:</Text> {order.quantity}
          </Text>
          <Text style={styles.summaryItem}>
            <Text style={styles.summaryHeader}>Lokasi Pemasangan:</Text>{" "}
            {order.installationLocation}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setShowNewOrderForm(true);
          slideAnim.setValue(0);
        }}
      >
        <Ionicons
          name="add-circle-outline"
          size={20}
          color="#1D8DF7"
          style={styles.icon}
        />
        <Text style={styles.addButtonText}>Tambah Pesanan Baru</Text>
      </TouchableOpacity>
      {showNewOrderForm && (
        <Animated.View
          style={[
            styles.newOrderForm,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.formTitle}>Tambah Pesanan Baru</Text>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={cancelNewOrder}
          >
            <Ionicons name="close" size={24} color="red" />
          </TouchableOpacity>
          {renderFormInputGroup([
            {
              placeholder: "Nama Pesanan",
              value: orders[1]?.orderName || "",
              name: "orderName",
              index: 1,
            },
            {
              placeholder: "Jumlah",
              value: orders[1]?.quantity || "",
              name: "quantity",
              index: 1,
              keyboardType: "numeric",
            },
            {
              placeholder: "Nama Vendor",
              value: orders[1]?.vendorName || "",
              name: "vendorName",
              index: 1,
            },
            {
              placeholder: "Lokasi Pemasangan",
              value: orders[1]?.installationLocation || "",
              name: "installationLocation",
              index: 1,
            },
            {
              placeholder: "ULP",
              value: orders[1]?.ulp || "",
              name: "ulp",
              index: 1,
            },
          ])}
          <TouchableOpacity style={styles.button} onPress={addNewOrder}>
            <Text style={styles.buttonText}>Tambahkan Pesanan</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.stepText}>{${currentStep} of 5}</Text>
        </View>
        <Text style={styles.title}>
          {currentStep === 1
            ? "Yuk, isi detail berita acara di sini!"
            : currentStep === 2
            ? "Isi detail pihak pertama di sini!"
            : currentStep === 3
            ? "Isi detail pihak kedua di sini!"
            : currentStep === 4
            ? "Yuk, isi detail pesanan di sini!"
            : "Ringkasan Pesanan"}
        </Text>
        <View style={styles.formContainer}>{renderFormContent()}</View>
        <TouchableOpacity
          style={styles.button}
          onPress={
            currentStep === 5 ? () => alert("Form submitted!") : handleNext
          }
        >
          <Text style={styles.buttonText}>
            {currentStep === 5 ? "Selesaikan Pesanan" : "Lanjutkan"}
          </Text>
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

// Styles tetap sama sesuai kebutuhan UI
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
  stepText: {
    fontSize: Math.min(width * 0.05, 18),
    color: "#555",
    textAlign: "center",
  },
  title: {
    fontSize: Math.min(width * 0.06, 22),
    fontWeight: "bold",
    color: "#000",
    marginBottom: height * 0.03,
  },
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
  buttonText: {
    color: "#fff",
    fontSize: Math.min(width * 0.045, 18),
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1D8DF7",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginTop: height * 0.02,
    width: "100%",
  },
  addButtonText: { color: "#1D8DF7", fontSize: 16, marginLeft: 8 },
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
  summaryTitle: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryHeader: { fontWeight: "bold" },
  summaryItem: { marginVertical: 5 },
  deleteButton: { position: "absolute", top: 10, right: 10 },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: { fontSize: Math.min(width * 0.04, 16), color: "#555" },
  newOrderForm: {
    borderWidth: 1,
    borderColor: "#1D8DF7",
    borderRadius: 8,
    padding: 15,
    marginTop: height * 0.02,
    backgroundColor: "#f0f8ff",
  },
  formTitle: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1D8DF7",
  },
  cancelButton: { alignSelf: "flex-end", marginBottom: 10 },
});