import SchemaForm from "./SchemaForm"
import useUploadForm from './schema'
import {Button, Form} from 'antd'

function App() {
  const [form] = Form.useForm()
  const {normalSchema, submitForm} = useUploadForm()

  return (
    <div style={{width: 500, height: 500}}>
      <SchemaForm
        form={form}
        onFinish={(values) => {
          console.log('values', values);
        }}
        schema={normalSchema} 
      />
      <Button
        onClick={() => {
          form.validateFields().then(() => {
            const formValues  = form.getFieldsValue()
            submitForm(formValues)
            console.log('form', form.getFieldsValue());
          })
        }}
      >查看表单数据</Button>
    </div>
  )
}

export default App
