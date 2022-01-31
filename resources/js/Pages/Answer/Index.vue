<template>
    <app-layout title="Dashboard">
        <div class="px-10 ">
            <!--  -->
            <div class="flex flex-col lg:flex-row justify-between lg:items-center my-2 lg:my-4">
                <div class="flex-1 order-2 lg:order-1">
                    
                </div>
                <div class="mb-2 lg:mb-0 ml-auto order-1 lg:order-2">
                    <div class="flex gap-x-2">
                        <Link :href="route('answers.create',answers.id)"
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
                                    Answer
                                </th>
                                <th class="px-3 py-2 lg:px-6 lg:py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Correct/Wrong
                                </th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(answer,index) in answers.answers" :key="index" class="bg-white">
                                <td class="px-3 py-2 lg:px-6 lg:py-3 whitespace-nowrap text-sm text-gray-900">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-3 py-2 lg:px-6 lg:py-3 whitespace-nowrap text-sm text-gray-900">
                                   <div class="font-bold text-gray-900">
                                        {{ answer.name }}
                                   </div>
                                </td>
                                 <td class="px-3 py-2 lg:px-6 lg:py-3 whitespace-nowrap text-sm text-gray-900">
                                    <Switch v-model="answer.status" @click="isCorrectAnswer(answer)"
                                            class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-green-700">
                                        <span class="sr-only">Use setting</span>
                                        <span aria-hidden="true"
                                              class="pointer-events-none absolute bg-white w-full h-full rounded-md"/>
                                        <span aria-hidden="true"
                                              :class="[answer.status ? 'bg-indigo-600' : 'bg-gray-200', 'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200']"/>
                                        <span aria-hidden="true"
                                              :class="[answer.status ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200']"/>
                                    </Switch>
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
        Switch
    },
    props: {
        answers: Object,
    },
    setup() {

        const isCorrectAnswer = (answer) => {
            Inertia.post(route("answers.status", answer.id),
                {
                    isCorrect: answer.isCorrect,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            )
        }

        return {
            isCorrectAnswer
        }
    }

})
</script>
