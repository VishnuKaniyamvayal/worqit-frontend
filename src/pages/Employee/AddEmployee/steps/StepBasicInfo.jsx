import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const { Option } = Select;

export function StepBasicInfo({ methods, roles, branches, designations, onNext }) {
  const { handleSubmit, control, formState } = methods;

  return (
    <Form layout="vertical" onFinish={handleSubmit(onNext)}>
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="employeeId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Employee ID"
                required
                validateStatus={formState.errors.employeeId ? "error" : ""}
                help={formState.errors.employeeId?.message}
              >
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Email"
                required
                validateStatus={formState.errors.email ? "error" : ""}
                help={formState.errors.email?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="employeeName"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Employee Name"
                required
                validateStatus={formState.errors.employeeName ? "error" : ""}
                help={formState.errors.employeeName?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Role"
                required
                validateStatus={formState.errors.roleId ? "error" : ""}
                help={formState.errors.roleId?.message}
              >
                <Select {...field} placeholder="Select role">
                  {roles.map((r) => (
                    <Option key={r.id} value={r.id}>
                      {r.roleName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="branchId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Branch"
                required
                validateStatus={formState.errors.branchId ? "error" : ""}
                help={formState.errors.branchId?.message}
              >
                <Select {...field} placeholder="Select branch">
                  {branches.map((b) => (
                    <Option key={b.id} value={b.id}>
                      {b.branchName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="designationId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Designation"
                required
                validateStatus={formState.errors.designationId ? "error" : ""}
                help={formState.errors.designationId?.message}
              >
                <Select {...field} placeholder="Select designation">
                  {designations.map((d) => (
                    <Option key={d.id} value={d.id}>
                      {d.designationName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Blood Group"
                required
                validateStatus={formState.errors.bloodGroup ? "error" : ""}
                help={formState.errors.bloodGroup?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Timezone"
                required
                validateStatus={formState.errors.timezone ? "error" : ""}
                help={formState.errors.timezone?.message}
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
        <Col span={12}>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Date of Birth"
                required
                validateStatus={formState.errors.dob ? "error" : ""}
                help={formState.errors.dob?.message}
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

        <Col span={12}>
          <Controller
            name="dateOfJoining"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Date of Joining"
                required
                validateStatus={formState.errors.dateOfJoining ? "error" : ""}
                help={formState.errors.dateOfJoining?.message}
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
