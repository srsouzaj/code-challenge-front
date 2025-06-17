import { memo } from "react";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
// } from "@/components/ui/form";

const confirmForm = () => {
  return (
    <>
      {/* <FormField
        key="vALFjZGX"
        control={control}
        name="vALFjZGX"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Aceito os termos e condições</FormLabel>
              <FormDescription></FormDescription>
            </div>
          </FormItem>
        )}
      /> */}
    </>
  );
};

export default memo(confirmForm);
