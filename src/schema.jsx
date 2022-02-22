import { Upload } from "antd"
import { useState } from "react"

const useUploadForm = () => {

    const [uploadUrl, setUploadUrl] = useState('')

    const beforeUpload = () => {
        setUploadUrl('设置了上传的地址url')
    }

    const submitForm = (formValues) => {
        console.log('formValues', formValues)
    }
    const uploadButton = (
        <div>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const normalSchema = [
        {name: 'name', label: '姓名', itemType: 'Input',  rules: [{required: true, message: '请输入姓名'}]},
        {name: 'Switch', label: 'Switch', itemType: 'Switch'},
        {name: 'DatePicker', label: 'DatePicker', itemType: 'DatePicker'},
        {name: 'RangePicker', label: 'RangePicker', itemType: 'RangePicker'},
        {name: 'age', label: '年龄', itemType: 'InputNumber', itemContentProps:{controls: false},  rules: [{required: true, message: '请输入年龄'}]},
        {name: 'gender', label: '性别', itemType: 'RadioGroup', radioOptions: [{value:1, label: '男'}, {value: 2, label: '女'}],rules: [{required: true, message: '请选择性别'}]},
        {name: 'checkboxGroup', label: 'checkboxGroup', itemType: 'CheckboxGroup', 
            checkboxOptions: [{value:1, label: 'A'}, {value: 2, label: 'B'},{value: 3, label: 'C'},{value: 4, label: 'D'}], 
            itemContentProps:{style: { display: 'flex', flexDirection: 'column' }}, 
            rules: [{required: true, message: '请选择checkboxGroup'}]},
        {name: 'Select', label: 'Select', itemType: 'Select', selectOptions: [{value:1, label: 'A'}, {value: 2, label: 'B'},{value: 3, label: 'C'},{value: 4, label: 'D'}]},
        {label: 'custom upload', itemType: 'custom', customItemContent: () =>  {
            return ( 
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
                {uploadButton}
            </Upload>
            )
        }},
    ]

    return {normalSchema, submitForm}
}


export default useUploadForm