import type { UnwrapNestedRefs } from "vue";
import type { z, ZodType } from "zod";
import type { FormSubmitEvent, UFormApi } from "~/types/form";
import type { SResponse } from "~/types/s-response";

type FormInitialValue<T extends ZodType<any, any, any>> = Partial<{
  [k in keyof z.output<T>]: any;
}>;

export function useFormd<T extends z.ZodRawShape>(arg: {
  schema: z.ZodObject<T>;

  onSubmit: (
    formSubmitEvent: FormSubmitEvent<z.output<typeof arg.schema>>,
    formElementApi: Ref<UFormApi | undefined>
  ) => Promise<void>;

  onError?: (
    error: any,
    formElementApi: Ref<UFormApi | undefined>
  ) => Promise<void>;

  initial?: FormInitialValue<typeof arg.schema>;
}) {
  const notif = useNotif();
  const clientSubmitWrapperFunction = ref<() => void>();
  const isLoading = ref(false);
  const state = reactive(initialStates(arg.schema, arg.initial));
  const error = ref<string>();
  const formRef = ref<UFormApi>();

  function initialStates(schema: z.AnyZodObject, defaults?: any) {
    const initialState = {} as any;
    for (const key in schema.shape) {
      initialState[key] = undefined;
      if (defaults) initialState[key] = defaults[key];
    }
    return initialState;
  }

  async function submitEvent(
    formSubmitEvent: FormSubmitEvent<z.output<typeof arg.schema>>
  ) {
    isLoading.value = true;
    error.value = undefined;
    try {
      await arg.onSubmit(formSubmitEvent, formRef);
    } catch (e) {
      const response = e as SResponse<any>;
      // notify(response);
      // error.value = response.messages;
      if (arg.onError) await arg.onError(error, formRef);
    }
    isLoading.value = false;
  }

  function reset() {
    const states = Object.entries(state);
    for (const [name] of states) {
      state[name] = undefined;
      if (arg.initial && arg.initial[name]) state[name] = arg.initial[name];
    }
  }

  return {
    state: state as UnwrapNestedRefs<z.infer<typeof arg.schema>>,
    isLoading: isLoading as Ref<boolean>,
    schema: arg.schema,
    submitEvent,
    error,
    ref: formRef,
    reset,
    submit: clientSubmitWrapperFunction,
  };
}
