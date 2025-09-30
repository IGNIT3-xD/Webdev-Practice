import { useState } from "react";

const useInputField = (defaultValue) => {
    const [field, setField] = useState(defaultValue)

    const handleField = (e) => {
        setField(e.target.value)
    }

    return [field, handleField];
}

export default useInputField;