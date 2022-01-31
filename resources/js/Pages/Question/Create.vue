<template>
    <app-layout>
        <div class="w-full lg:w-3/5 mx-auto space-y-3 lg:space-y-6 bg-white rounded-md pb-3 lg:pb-6">
            <div class="border-b border-gray-200 py-2 lg:py-3">
                <!-- Form Header with breadcrumb -->
                <div class="flex items-center justify-between px-2 lg:px-4">
                    <div>
                        <h1 class="text-lg lg:text-xl text-gray-900 font-semibold">
                            Answer
                        </h1>
                        <Breadcrumb
                            :links="[
                                {title: 'Application' , url: '/'},
                                {title: 'Question' , url: '#'},
                                {title: 'Create' , url: ''}
                            ]"
                        />
                    </div>
                    <!-- New Action Button -->
                    <div class="flex gap-4">
                        <!-- <SecondaryLink path="/settings/roles">
                            Back
                        </SecondaryLink> -->
                    </div>
                </div>
            </div>
            <!-- User Information Form -->
            <form @submit.prevent="submit" class="px-2 lg:px-4">
                <div
                    class="space-y-3 lg:space-y-8 divide-y divide-gray-200 py-2 lg:py-6 px-2 lg:px-4 border border-gray-200 rounded-md shadow-sm">
                    <div>
                        <div>
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Answer Information
                            </h3>
                        </div>
                        <div class="mt-3 lg:mt-6 grid grid-cols-1 gap-y-2 lg:gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6 space-y-1">
                                <Label value="Question Name"/>
                                <input v-model="form.name" type="text"
                                       class="h-10 w-full p-2 block text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-primary">
                                <!-- Error message -->
                                <InputError :message="form.errors.name"/>
                            </div>

                            <div class="sm:col-span-6 space-y-1">
                                <Label value="Mark"/>
                                <input v-model="form.mark" type="number"
                                       class="h-10 w-full p-2 block text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-primary">
                                <!-- Error message -->
                                <InputError :message="form.errors.mark"/>
                            </div>
                        </div>
                    </div>
                    <div class="pt-5">
                        <div class="flex items-center justify-end gap-4">
                            <SecondaryButton :href="route('questions.index')">Cancel</SecondaryButton>
                            <PrimaryButton :type="submit">
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </app-layout>
</template>

<script>

import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import {useForm} from '@inertiajs/inertia-vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Label from "@/Jetstream/Label.vue"
import InputError from "@/Jetstream/InputError.vue"
import Dropdown from "@/Jetstream/Dropdown.vue"

export default {
    name: 'Create',
    components: {
        PrimaryButton,
        SecondaryButton,
        AppLayout,
        Label,
        InputError,
        Dropdown
    },
    props: {
        organizations: Array
    },
    setup() {
        const form = useForm({
            name: null,
            mark: null,
        })

        const submit = () => {
            form.post(route('questions.store'), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => form.reset('name', 'mark'),
            })
        }

        return {
            submit,
            form
        }
    }
}
</script>
