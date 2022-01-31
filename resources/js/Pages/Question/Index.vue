<template>
    <app-layout title="Dashboard">
        <div class="px-10 ">
            <!--  -->
            <div class="flex flex-col lg:flex-row justify-between lg:items-center my-2 lg:my-4">
                <div class="flex-1 order-2 lg:order-1">
                    
                </div>
                <div class="mb-2 lg:mb-0 ml-auto order-1 lg:order-2">
                    <div class="flex gap-x-2">
                        <Link :href="route('questions.create')"
                              class="h-8 lg:h-10 inline-flex items-center px-3 lg:px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-dark active:bg-dark focus:outline-none focus:shadow-outline-gray transition ease-in-out duration-150">
                            Create
                        </Link>
                    </div>
                </div>
            </div>
            <!-- Activity table (small breakpoint and up) -->
            <div class="container mx-auto">
                <div class="flex flex-col mt-2">
                    <div
                        class="align-middle min-w-full overflow-x-auto shadow overflow-hidden rounded-md sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th class="px-3 py-2 lg:px-6 lg:py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th class="px-3 py-2 lg:px-6 lg:py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Questions
                                </th>

                                <th class="px-3 py-2 lg:px-6 lg:py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mark
                                </th>
                               
                                <th class="px-3 py-2 lg:px-6 lg:py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(question,index) in questions" :key="index" class="bg-white">
                                <td class="px-3 py-2 lg:px-6 lg:py-3 whitespace-nowrap text-sm text-gray-900">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 py-2 lg:px-6 lg:py-3 whitespace-nowrap text-sm text-gray-900">
                                   <div class="font-bold text-gray-900">
                                        {{ question.name }}
                                   </div>
                                   <Link :href="route('answers.index',question.id)"> <p class="text-cyan-400 py-2">Assign MCQ</p> </Link>
                                </td>
                                <td class="px-3 py-2 lg:px-6 lg:py-3 whitespace-nowrap text-sm text-gray-900">
                                    {{ question.mark }}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
    <Notification/>
</template>

<script>
import {defineComponent, reactive, ref, watch} from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue';
import {Link} from '@inertiajs/inertia-vue3';
import {Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot, Switch} from "@headlessui/vue"
import {PencilAltIcon, TrashIcon, ExclamationIcon} from '@heroicons/vue/outline';
import {Inertia} from '@inertiajs/inertia';


export default defineComponent({
    components: {
        AppLayout,
        Link,
        PencilAltIcon,
        TrashIcon,
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ExclamationIcon,
    },
    props: {
        questions: Array,
    },
    setup() {
        const open = ref(false)
        const branch_id = ref(null)

        function openModel(id) {
            branch_id.value = id
            open.value = true
        }

        function deleteRole() {
            Inertia.delete(route('branches.destroy', branch_id.value), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    open.value = false
                },
            })
        }

        return {
            open,
            openModel,
            deleteRole,
        }
    }

})
</script>
