<script setup lang="ts">
import { useQuestionImportDialog } from './useQuestionImportDialog'

const isOpen = defineModel<boolean>({ required: true })

const props = defineProps<{ questionnaireId: number }>()

const { source, file, formAction, preview, validRows, errorCount, canImport, onImport } =
  useQuestionImportDialog(isOpen, props.questionnaireId)
</script>

<template>
  <v-dialog v-model="isOpen" max-width="800">
    <v-card class="pa-2" title="Import questions">
      <v-card-text>
        <div class="d-flex align-center justify-space-between flex-wrap ga-2 mb-4">
          <span class="text-body-medium text-muted">Upload a JSON file, or paste the JSON.</span>
          <v-btn
            download
            href="/samples/quizmosa-questions-sample.json"
            prepend-icon="mdi-download"
            size="small"
            variant="text"
          >
            Sample file
          </v-btn>
        </div>

        <v-alert
          v-if="formAction.formAlert"
          :text="formAction.formMessage"
          class="mb-4"
          density="compact"
          type="error"
          variant="tonal"
        ></v-alert>

        <v-file-input
          v-model="file"
          accept=".json,application/json"
          class="mb-2"
          hide-details
          label="JSON file"
          prepend-icon=""
          prepend-inner-icon="mdi-code-json"
        ></v-file-input>

        <v-textarea
          v-model="source"
          class="mt-4"
          hide-details
          label="Or paste JSON"
          rows="5"
          style="font-family: monospace"
        ></v-textarea>

        <v-alert
          v-if="preview?.fileError"
          :text="preview.fileError"
          class="mt-4"
          density="compact"
          type="error"
          variant="tonal"
        ></v-alert>

        <template v-else-if="preview">
          <div class="text-body-medium mt-4 mb-2">
            {{ validRows.length }} ready
            <span v-if="errorCount > 0" class="text-error">
              · {{ errorCount }} with errors. Fix them to import.
            </span>
          </div>

          <v-table density="compact" fixed-header height="280">
            <thead>
              <tr>
                <th>Row</th>
                <th>Prompt</th>
                <th>Answer</th>
                <th>Points</th>
                <th>Seconds</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in preview.rows" :key="row.rowNumber">
                <td>{{ row.rowNumber }}</td>
                <td>{{ row.prompt }}</td>
                <td>{{ row.answer }}</td>
                <td>{{ row.points ?? 'Default' }}</td>
                <td>{{ row.seconds ?? 'Default' }}</td>
                <td>
                  <span v-if="row.errors.length === 0" class="text-success">Ready</span>
                  <div v-for="error in row.errors" v-else :key="error" class="text-error">
                    {{ error }}
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="isOpen = false">Cancel</v-btn>
        <v-btn
          :disabled="!canImport"
          :loading="formAction.formProcess"
          color="primary"
          variant="flat"
          @click="onImport"
        >
          Import {{ validRows.length || '' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
