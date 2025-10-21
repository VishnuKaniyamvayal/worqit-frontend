import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

export type adDetailsMaster = {
  id: number;
  admName: string;
  admType: "TEXT" | "NUMBER" | "DATE" | "SELECT";
  isRequired: boolean;
  options: string[];
};

export function ADDetailsStep({
  methods,
  adFields,
  onNext,
  onBack,
}: {
  methods: any;
  adFields: adDetailsMaster[];
  onNext: (data: any[]) => void;
  onBack?: () => void;
}) {
  const { handleSubmit, control, formState } = methods;
  const { errors } = formState;

  const submit = (formData: Record<string, any>) => {
    const formatted = adFields.map((f) => ({
      admMasterId: f.id,
      value: formData[`value_${f.id}`] || "",
    }));
    onNext(formatted);
  };

  const renderField = (f: adDetailsMaster, field: any) => {
    switch (f.admType) {
      case "TEXT":
        return <Input {...field} placeholder={`Enter ${f.admName}`} />;

      case "NUMBER":
        return <Input type="number" {...field} placeholder={`Enter ${f.admName}`} />;

      case "DATE":
        return (
          <DatePicker
            style={{ width: "100%" }}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toISOString() : "")}
            placeholder={`Select ${f.admName}`}
          />
        );

      case "SELECT":
        return (
          <Select
            {...field}
            placeholder={`Select ${f.admName}`}
            options={f.options.map((opt) => ({ label: opt, value: opt }))}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(submit)}>
      <Row gutter={16}>
        {adFields.map((f) => (
          <Col span={12} key={f.id}>
            <Controller
              name={`value_${f.id}`}
              control={control}
              rules={{ required: f.isRequired }}
              render={({ field }) => (
                <Form.Item
                  label={f.admName}
                  required={f.isRequired}
                  validateStatus={errors?.[`value_${f.id}`] ? "error" : ""}
                  help={errors?.[`value_${f.id}`] ? `${f.admName} is required` : ""}
                >
                  {renderField(f, field)}
                </Form.Item>
              )}
            />
          </Col>
        ))}
      </Row>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
        {onBack && (
          <Button onClick={onBack} style={{ marginRight: 8 }}>
            Back
          </Button>
        )}
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
