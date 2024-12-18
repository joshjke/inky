function union(sets) {
    const u = new Set();
    for (const set of sets) {
        for (const elem of set) {
            u.add(elem);
        }
    }
    return u;
}

// Helper function that gets all the divert targets from a list of InkFiles
function getAllDivertTargets(files) {
    return union(files.map((file) => file.symbols.getCachedDivertTargets()));
}

// Helper function that gets all the variable names from a list of InkFiles
function getAllVariables(files) {
    return union(files.map((file) => file.symbols.getCachedVariables()));
}

// Helper function that gets all the vocabulary words from a list of InkFiles
function getAllVocabWords(files) {
    return union(files.map((file) => file.symbols.getCachedVocabWords()));
}

function getAllCommandWords(files) {
    return union(files.map((file) => file.symbols.getCachedCommandWords()));
}

// Helper function that generates suggestions for all the divert targets
function getAllDivertTargetSuggestions(inkFiles) {
    const targets = getAllDivertTargets(inkFiles);
    const suggestions = [];
    for (const target of targets) {
        suggestions.push({
            caption: target,
            value: target,
            meta: "Divert Target",
        });
    }
    return suggestions;
}





// Helper function that generates suggestions for all the variables
function getAllVariableSuggestions(inkFiles) {
    const variables = getAllVariables(inkFiles);
    const suggestions = [];
    for (const variable of variables) {
        suggestions.push({
            caption: variable,
            value: variable,
            meta: "Variable",
        });
    }
    return suggestions;
}

// Helper function that generates suggestions for all the vocabulary
function getAllVocabSuggestions(inkFiles) {
    const vocabWords = getAllVocabWords(inkFiles);
    const suggestions = [];
    for (const vocabWord of vocabWords) {
        suggestions.push({
            caption: vocabWord,
            value: vocabWord,
            meta: "Vocabulary",
        });
    }
    return suggestions;
}

exports.inkCompleter = {
    inkFiles: [],

    getCompletions(editor, session, pos, prefix, callback) {
        // There are three possible ways we may want to suggest completions:
        //
        // 1) If we are in a divert or divert target, we should only suggest
        //    target names.
        // 2) If we are in a logic section, we should suggest variables,
        //    targets, (because they can be used as variables) and vocab words.
        //    (because logic can output text)
        // 3) If we are not in either, we should only suggest vocab words.

        const cursorToken = session.getTokenAt(pos.row, pos.column);
        const isCursorInDivert = (cursorToken.type.indexOf("divert") != -1);
        const isCursorInFlow = (cursorToken.type.indexOf("flow") != -1);
        const isCursorInLabel = (cursorToken.type.indexOf(".label") != -1);
        const isCursorInLogic = (cursorToken.type.indexOf("logic") != -1);
        const isCursorInCommand = (cursorToken.type.indexOf("command") != -1);

        // Ignore the prefix. ACE will find the most likely words in the list
        // for the prefix automatically.

        var suggestions;
        if( isCursorInDivert || isCursorInFlow || isCursorInLabel ) {
            suggestions = getAllDivertTargetSuggestions(this.inkFiles);
        } else if( isCursorInLogic ) {
            const divertTargetSuggestions = getAllDivertTargetSuggestions(this.inkFiles);
            const variableSuggestions = getAllVariableSuggestions(this.inkFiles);
            const vocabSuggestions = getAllVocabSuggestions(this.inkFiles);
            suggestions = divertTargetSuggestions.concat(variableSuggestions).
                    concat(vocabSuggestions);
        } else if ( isCursorInCommand ) {
            suggestions = getAllCommandSuggestions(this.inkFiles);
        } else {
            suggestions = getAllVocabSuggestions(this.inkFiles);
        }

        callback(null, suggestions);
    }
};


// Helper function that generates suggestions for all the commands
function getAllCommandSuggestions(inkFiles) {
    const suggestions = [];

    /*const commandWords = getAllCommandWords(inkFiles);
    for (const commandWord of commandWords) {
        suggestions.push({
            caption: commandWord,
            value: commandWord,
            meta: "Command",
        });
    }*/
    
    suggestions.push({
        caption: "character",
            value: "character",
            meta: "Command",
    },{
        caption: "charlie",
            value: "charlie",
            meta: "Command",
    },{
        caption: "riley",
            value: "riley",
            meta: "Command",
    },{
        caption: "alex",
            value: "alex",
            meta: "Command",
    },{
        caption: "on_destination ( DESTINATION_HERE )",
            value: "on_destination ( DESTINATION_HERE )",
            meta: "Command",
    },{
        caption: "",
            value: "",
            meta: "Command",
            
        },{
        caption: "_walk",
            value: "_walk",
            meta: "Command",
        },{
        caption: "_run",
            value: "_run",
            meta: "Command",
            },{
        caption: "_run1",
            value: "_run1",
            meta: "Command",
            },{
        caption: "_run2",
            value: "_run2",
            meta: "Command",
            },{
        caption: "_run3",
            value: "_run3",
            meta: "Command",
            },{
        caption: "_run4",
            value: "_run4",
            meta: "Command",
            },{
        caption: "_run5",
            value: "_run5",
            meta: "Command",
            },{
        caption: "_run6",
            value: "_run6",
            meta: "Command",
            },{
        caption: "_run7",
            value: "_run7",
            meta: "Command",
                    },{
        caption: "_run8",
            value: "_run8",
            meta: "Command",
    
            },{
        caption: "_run9",
            value: "_run9",
            meta: "Command",
    
            },{
        caption: "_run10",
            value: "_run10",
            meta: "Command",
    
            },{
        caption: "_run11",
            value: "_run11",
            meta: "Command",
    
            },{
        caption: "_run12",
            value: "_run12",
            meta: "Command",
    
            },{
        caption: "_run13",
            value: "_run13",
            meta: "Command",
    
            },{
        caption: "_run14",
            value: "_run14",
            meta: "Command",
    
            },{
        caption: "_run15",
            value: "_run15",
            meta: "Command",
    
            },{
        caption: "_run16",
            value: "_run16",
            meta: "Command",
    
            },{
        caption: "_run17",
            value: "_run17",
            meta: "Command",
            },{
        caption: "sfx stop SFX_NAME}",
            value: "sfx stop SFX_NAME}",
            meta: "Command",
        },
        {
        caption: "help sfx stop SFX_NAME} - Stop a specific sound",
            value: "help sfx stop SFX_NAME} - Stop a specific sound",
            meta: "Command",
        },
        {
        caption: "time_of_day {time_of_day}",
            value: "time_of_day {time_of_day}",
            meta: "Command",
        },
        {
        caption: "help time_of_day {time_of_day} - Sets the time of day. Affects lighting. morning, noon, afternooon, evening, night",
            value: "help time_of_day {time_of_day} - Sets the time of day. Affects lighting. morning, noon, afternooon, evening, night",
            meta: "Command",
        },
        {
        caption: "c_alex",
            value: "c_alex",
            meta: "Character",
        },{
        caption: "c_alex_dream",
            value: "c_alex_dream",
            meta: "Character",
        },{
        caption: "c_bria",
            value: "c_bria",
            meta: "Character",
        },{
        caption: "c_brownie",
            value: "c_brownie",
            meta: "Character",
        },{
        caption: "c_bunman",
            value: "c_bunman",
            meta: "Character",
        },{
        caption: "c_charlie",
            value: "c_charlie",
            meta: "Character",
        },{
        caption: "c_charlie_dream",
            value: "c_charlie_dream",
            meta: "Character",
        },{
        caption: "c_clovis",
            value: "c_clovis",
            meta: "Character",
        },{
        caption: "c_connor",
            value: "c_connor",
            meta: "Character",
        },{
        caption: "c_dad",
            value: "c_dad",
            meta: "Character",
        },{
        caption: "c_dustin",
            value: "c_dustin",
            meta: "Character",
        },{
        caption: "c_eliana",
            value: "c_eliana",
            meta: "Character",
        },{
        caption: "c_erika",
            value: "c_erika",
            meta: "Character",
        },{
        caption: "c_jason",
            value: "c_jason",
            meta: "Character",
        },{
        caption: "c_juliette",
            value: "c_juliette",
            meta: "Character",
        },{
        caption: "c_kaden",
            value: "c_kaden",
            meta: "Character",
        },{
        caption: "c_klarissa",
            value: "c_klarissa",
            meta: "Character",
        },{
        caption: "c_lee",
            value: "c_lee",
            meta: "Character",
        },{
        caption: "c_logan",
            value: "c_logan",
            meta: "Character",
        },{
        caption: "c_mason",
            value: "c_mason",
            meta: "Character",
        },{
        caption: "c_mom",
            value: "c_mom",
            meta: "Character",
        },{
        caption: "c_nicole",
            value: "c_nicole",
            meta: "Character",
        },{
        caption: "c_riley",
            value: "c_riley",
            meta: "Character",
        },{
        caption: "c_riley_dream",
            value: "c_riley_dream",
            meta: "Character",
        },{
        caption: "c_sammy",
            value: "c_sammy",
            meta: "Character",
        },{
        caption: "c_sky",
            value: "c_sky",
            meta: "Character",
        },

    
    );
    
    return suggestions;
}