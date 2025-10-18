import type { ContactInfoFormValues } from "../../../../schemas/AddEmployee";
import { Button, Form, Input, Row, Col } from "antd";
import { useForm, Controller } from "react-hook-form";

export function StepContactInfo({
  methods,
  onNext,
  onBack,
}: {
  methods: ReturnType<typeof useForm<ContactInfoFormValues>>;
  onNext: (data: ContactInfoFormValues) => void;
  onBack: () => void;
}) {
  const { handleSubmit, control, formState } = methods;

  return (
    <Form layout="vertical" onFinish={handleSubmit(onNext)}>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="mobileNumber"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Mobile Number"
                required
                validateStatus={formState.errors.mobileNumber ? "error" : ""}
                help={formState.errors.mobileNumber?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="emergencyPhone"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Emergency Phone"
                validateStatus={formState.errors.emergencyPhone ? "error" : ""}
                help={formState.errors.emergencyPhone?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="houseNumber"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="House Number"
                required
                validateStatus={formState.errors.houseNumber ? "error" : ""}
                help={formState.errors.houseNumber?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="streetName"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Street Name"
                required
                validateStatus={formState.errors.streetName ? "error" : ""}
                help={formState.errors.streetName?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="landmark"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Landmark"
                validateStatus={formState.errors.landmark ? "error" : ""}
                help={formState.errors.landmark?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="District"
                required
                validateStatus={formState.errors.district ? "error" : ""}
                help={formState.errors.district?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="State"
                required
                validateStatus={formState.errors.state ? "error" : ""}
                help={formState.errors.state?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Country"
                required
                validateStatus={formState.errors.country ? "error" : ""}
                help={formState.errors.country?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={24}>
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Pincode"
                required
                validateStatus={formState.errors.pincode ? "error" : ""}
                help={formState.errors.pincode?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={24}>
          <Controller
            name="familyDetails"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Family Details"
                validateStatus={formState.errors.familyDetails ? "error" : ""}
                help={formState.errors.familyDetails?.message as any}
              >
                <Input.TextArea {...field} rows={4} />
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <Button onClick={onBack}>Back</Button>
        <Button type="primary" htmlType="submit" disabled={!formState.isValid}>
          Next
        </Button>
      </div>
    </Form>
  );
}
