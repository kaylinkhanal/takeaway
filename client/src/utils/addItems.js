export const addItems = async (values, file, isAdminEdit, message, fetchAvailableItems, handleCancel) => {
    const formData = new FormData()
    formData.append('categoryName', values.categoryName)
    formData.append('minimumDeliveryPrice', values.minimumDeliveryPrice)
    formData.append('photo', file)
    const requestOptions = {
        method: isAdminEdit ? "PUT" : "POST",
        body: formData,
    };
    const res = await fetch(
        "http://localhost:3005/items", requestOptions
    );
    const data = await res.json();
    if (res.status === 200) {
        message.success(data.msg, [2])
    } else {
        message.error(data.msg, [2])
    }
    fetchAvailableItems();
    handleCancel();

}
