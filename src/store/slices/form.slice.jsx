import { createSlice } from '@reduxjs/toolkit';

export const fieldSlice = createSlice({
    name: "field",
    initialState: {
        rules: [],  
        combinator: null,  
    },
    reducers: {
        addField(state, action) {
            const { id } = action.payload;
            
            // Checking if the 'rules' property already exists in the state
            if (!('rules' in state)) {
                state.rules = [];
            }

            // Checking if the id already exists in the state
            const existingFieldIndex = state.rules.findIndex((data) => data.id === id);

            if (existingFieldIndex !== -1) {
                console.log(`Field with id ${id} already exists. Updating existing field.`);
            } else {
                const { id, ruleType, score, value, operator, combinator } = action.payload;
                const data = {
                    "id": id,
                    "key": ruleType,
                    "output": {
                        "value": value,
                        "operator": operator,
                        "score": score
                    }
                };
                state.rules.push(data);
                state.combinator = combinator;
            }
        },
        removeField(state, action) {
            // Use filter on 'rules' array, not directly on 'state'
            state.rules = state.rules.filter((data) => action.payload !== data.id);
        }
    }
});

console.log(fieldSlice.actions);

export const { addField, removeField } = fieldSlice.actions;
export default fieldSlice.reducer;
