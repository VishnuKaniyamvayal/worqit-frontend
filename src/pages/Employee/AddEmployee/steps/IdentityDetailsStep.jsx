import { Button, Form, Input, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";

export function IdentityDetailsStep({ methods, identityFields, onNext, onBack }) {
  const { handleSubmit, control, formState } = methods;
  const { errors } = formState;

  const submit = (formData) => {
    const formatted = identityFields.map((f) => ({
      identityMasterId: f.id,
      value: formData[`value_${f.id}`] || "",
      attachment: formData[`attachment_${f.id}`] || null,
    }));
    onNext(formatted);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(submit)}>
      <Row gutter={16}>
        {identityFields.map((f) => (
          <Col span={12} key={f.id}>
            <Controller
              name={`value_${f.id}`}
              control={control}
              rules={{ required: f.isRequired }}
              render={({ field }) => (
                <Form.Item
                  label={f.idName}
                  required={f.isRequired}
                  validateStatus={errors?.[`value_${f.id}`] ? "error" : ""}
                  help={errors?.[`value_${f.id}`] ? `${f.idName} is required` : ""}
                >
                  <Input {...field} placeholder={`Enter ${f.idName} Number`} />
                </Form.Item>
              )}
            />

            <Controller
              name={`attachment_${f.id}`}
              control={control}
              rules={{ required: f.isAttachmentRequired }}
              render={({ field }) => (
                <Form.Item
                  label={`${f.idName} Attachment`}
                  required={f.isAttachmentRequired}
                  validateStatus={errors?.[`attachment_${f.id}`] ? "error" : ""}
                  help={errors?.[`attachment_${f.id}`] ? "Attachment required" : ""}
                >
                  <Upload
                    beforeUpload={(file) => {
                      const fakeUrl = URL.createObjectURL(file);
                      field.onChange(fakeUrl);
                      return false;
                    }}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>

                  {field.value && (
                    <a
                      href={field.value}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "block", marginTop: 8 }}
                    >
                      View Uploaded File
                    </a>
                  )}
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
