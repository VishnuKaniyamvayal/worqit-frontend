
import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import type { BasicInfoFormValues } from "../../../../schemas/AddEmployee";

const { Option } = Select;

export function StepBasicInfo({
  methods,
  roles,
  branches,
  designations,
  onNext,
}: {
  methods: ReturnType<typeof useForm<BasicInfoFormValues>>;
  roles: any[];
  branches: any[];
  designations: any[];
  onNext: (data: BasicInfoFormValues) => void;
}) {
  const { handleSubmit, control, formState } = methods;

  return (
    <Form layout="vertical" onFinish={handleSubmit(onNext)}>
      <Row gutter={16}>
        {/* Employee ID */}
        <Col span={12}>
          <Controller
            name="employeeId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Employee ID"
                required
                validateStatus={formState.errors.employeeId ? "error" : ""}
                help={formState.errors.employeeId?.message as any}
              >
                <Input {...field} type="number" onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} />
              </Form.Item>
            )}
          />
        </Col>

        {/* Email */}
        <Col span={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Email"
                required
                validateStatus={formState.errors.email ? "error" : ""}
                help={formState.errors.email?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Employee Name */}
        <Col span={12}>
          <Controller
            name="employeeName"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Employee Name"
                required
                validateStatus={formState.errors.employeeName ? "error" : ""}
                help={formState.errors.employeeName?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        {/* Role */}
        <Col span={12}>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Role"
                required
                validateStatus={formState.errors.roleId ? "error" : ""}
                help={formState.errors.roleId?.message as any}
              >
                <Select {...field} placeholder="Select role">
                  {roles.map((r) => (
                    <Option key={r.id} value={r.id}>
                      {r.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Branch */}
        <Col span={12}>
          <Controller
            name="branchId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Branch"
                required
                validateStatus={formState.errors.branchId ? "error" : ""}
                help={formState.errors.branchId?.message as any}
              >
                <Select {...field} placeholder="Select branch">
                  {branches.map((b) => (
                    <Option key={b.id} value={b.id}>
                      {b.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
        </Col>

        {/* Designation */}
        <Col span={12}>
          <Controller
            name="designationId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Designation"
                required
                validateStatus={formState.errors.designationId ? "error" : ""}
                help={formState.errors.designationId?.message as any}
              >
                <Select {...field} placeholder="Select designation">
                  {designations.map((d) => (
                    <Option key={d.id} value={d.id}>
                      {d.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Blood Group */}
        <Col span={12}>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Blood Group"
                required
                validateStatus={formState.errors.bloodGroup ? "error" : ""}
                help={formState.errors.bloodGroup?.message as any}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        {/* Timezone */}
        <Col span={12}>
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Timezone"
                required
                validateStatus={formState.errors.timezone ? "error" : ""}
                help={formState.errors.timezone?.message as any}
              >
                <Select {...field} placeholder="Select timezone">
                  <Option value="Asia/Kolkata">Asia/Kolkata</Option>
                  <Option value="Asia/Dubai">Asia/Dubai</Option>
                </Select>
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        {/* DOB */}
        <Col span={12}>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Date of Birth"
                required
                validateStatus={formState.errors.dob ? "error" : ""}
                help={formState.errors.dob?.message as any}
              >
                <DatePicker
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toDate() : undefined)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )}
          />
        </Col>

        {/* Date of Joining */}
        <Col span={12}>
          <Controller
            name="dateOfJoining"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Date of Joining"
                required
                validateStatus={formState.errors.dateOfJoining ? "error" : ""}
                help={formState.errors.dateOfJoining?.message as any}
              >
                <DatePicker
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toDate() : undefined)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" htmlType="submit" disabled={!formState.isValid}>
          Next
        </Button>
      </div>
    </Form>
  );
}
