import { useForm, Controller } from "react-hook-form";
import type { JobDetailsFormValues } from "../../../../schemas/AddEmployee";
import { Button, Form, Select, } from "antd";
const { Option } = Select;
export function StepJobDetails({ methods, onNext, onBack }: {
  methods: ReturnType<typeof useForm<JobDetailsFormValues>>;
  onNext: (data: JobDetailsFormValues) => void;
  onBack: () => void;
}) {
  const { handleSubmit, control, formState } = methods;
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <Form layout="vertical" onFinish={handleSubmit(onNext)}>
      <Controller
        name="weekOff"
        control={control}
        render={({ field }) => (
          <Form.Item label="Week Off (select up to 2)" required validateStatus={formState.errors.weekOff ? "error" : ""} help={formState.errors.weekOff?.message as any}>
            <Select mode="multiple" {...field} value={field.value} onChange={(val) => field.onChange(val)} placeholder="Select week off days" maxTagCount={2}>
              {weekDays.map((d) => (
                <Option key={d} value={d}>{d}</Option>
              ))}
            </Select>
          </Form.Item>
        )}
      />

      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <Button onClick={onBack}>Back</Button>
        <Button type="primary" htmlType="submit" disabled={!formState.isValid}>Next</Button>
      </div>
    </Form>
  );
}