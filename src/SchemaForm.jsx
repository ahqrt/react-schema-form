import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch } from 'antd'
const { RangePicker } = DatePicker
/**
 * 渲染radio的内部内容
 * @param {*} content 传入的radio内容
 * @returns
 */
const renderRadioContent = (content) => {
	return content.map((item) => (
		<Radio value={item.value} key={item.value}>
			{item.label}{' '}
		</Radio>
	))
}

/**
 * 渲染checkbox的内部内容
 * @param {*} content 传入的checkbox内容
 * @returns
 */
const renderCheckboxContent = (content) => {
	return content.map((item) => (
		<Checkbox value={item.value} key={item.value}>
			{item.label}{' '}
		</Checkbox>
	))
}

/**
 * 渲染select的内部内容
 * @param {*} content 传入的select内容
 * @returns
 */
const renderSelectContent = (content) => {
	return content.map((item) => (
		<Select.Option value={item.value} key={item.value}>
			{item.label}{' '}
		</Select.Option>
	))
}

const getSchemaItemType = (schema) => {
	let SchemaItem = undefined
	let SchemaItemContent = undefined
	switch (schema.itemType) {
		case 'Input':
			SchemaItem = Input
			break
		case 'InputNumber':
			SchemaItem = InputNumber
			break
		case 'RadioGroup':
			SchemaItem = Radio.Group
			SchemaItemContent = renderRadioContent(schema.radioOptions)
			break
		case 'CheckboxGroup':
			SchemaItem = Checkbox.Group
			SchemaItemContent = renderCheckboxContent(schema.checkboxOptions)
			break
		case 'Select':
			SchemaItem = Select
			SchemaItemContent = renderSelectContent(schema.selectOptions)
			break
        case 'Switch':
            SchemaItem = Switch
            break
        case 'DatePicker':
            SchemaItem = DatePicker
            break
        case 'RangePicker':
            SchemaItem = RangePicker
            break
		default:
			SchemaItem = Input
			break
	}
	if (SchemaItemContent) {
		return <SchemaItem {...schema.itemContentProps}>{SchemaItemContent}</SchemaItem>
	} else {
		return <SchemaItem {...schema.itemContentProps} />
	}
}

/**
 * 渲染自定义组件的内容
 * @param {*} customItemContent
 * @returns
 */
const transCustomItemContent = (customItemContent) => {
	if (typeof customItemContent === 'function') {
		return customItemContent()
	} else {
		return customItemContent
	}
}

/**
 * 转化schema数据
 * @param {*} schema
 * @returns
 */
const transSchema = (schema) => {
	if (schema.itemType === 'custom') {
		return (
			<Form.Item
				label={schema.label}
				name={schema.name}
				rules={schema.rules}
				key={schema.name || schema.label}
				{...schema.formItemProps}
			>
				{transCustomItemContent(schema.customItemContent)}
			</Form.Item>
		)
	} else {
		return (
			<Form.Item
				label={schema.label}
				name={schema.name}
				rules={schema.rules}
				key={schema.name}
				{...schema.formItemProps}
			>
				{getSchemaItemType(schema)}
			</Form.Item>
		)
	}
}

/**
 *
 * @param {*} schema 传入的schema数据
 * @returns {Form} 返回一个Form组件
 */
const SchemaForm = ({ schema, ...props }) => {
	return <Form {...props}>{schema.map(transSchema)}</Form>
}

export default SchemaForm
