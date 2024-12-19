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

        // COMMANDS
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
    },


{
        caption: "add_star CHARACTER_NAME",
            value: "add_star CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "advance",
            value: "advance",
            meta: "Command",
        },{
        caption: "background fade_in FADE_TIME",
            value: "background fade_in FADE_TIME",
            meta: "Command",
        },{
        caption: "background fade_to_white FADE_TIME",
            value: "background fade_to_white FADE_TIME",
            meta: "Command",
        },{
        caption: "background fade_to_black FADE_TIME",
            value: "background fade_to_black FADE_TIME",
            meta: "Command",
        },{
        caption: "background set BACKGROUND_NAME",
            value: "background set BACKGROUND_NAME",
            meta: "Command",
        },{
        caption: "block movement",
            value: "block movement",
            meta: "Command",
        },{
        caption: "brick_add_loaded_brick",
            value: "brick_add_loaded_brick",
            meta: "Command",
        },{
        caption: "brick_add BRICK_NAME",
            value: "brick_add BRICK_NAME",
            meta: "Command",
        },{
        caption: "stage_sword",
            value: "stage_sword",
            meta: "Command",
        },{
        caption: "camera battle focus TARGET_NAME",
            value: "camera battle focus TARGET_NAME",
            meta: "Command",
        },{
        caption: "camera_battle_size PERCENTAGE",
            value: "camera_battle_size PERCENTAGE",
            meta: "Command",
        },{
        caption: "camera_bounds_block",
            value: "camera_bounds_block",
            meta: "Command",
        },{
        caption: "camera_bounds_unblock",
            value: "camera_bounds_unblock",
            meta: "Command",
        },{
        caption: "camera resize speed default",
            value: "camera resize speed default",
            meta: "Command",
        },{
        caption: "camera resize speed SPEED_VALUE",
            value: "camera resize speed SPEED_VALUE",
            meta: "Command",
        },{
        caption: "camera chase_speed default",
            value: "camera chase_speed default",
            meta: "Command",
        },{
        caption: "camera chase_speed SPEED_VALUE",
            value: "camera chase_speed SPEED_VALUE",
            meta: "Command",
        },{
        caption: "camera focus2 TARGET1 TARGET2",
            value: "camera focus2 TARGET1 TARGET2",
            meta: "Command",
        },{
        caption: "camera focus TARGET_NAME",
            value: "camera focus TARGET_NAME",
            meta: "Command",
        },{
        caption: "camera offset X_VALUE Y_VALUE",
            value: "camera offset X_VALUE Y_VALUE",
            meta: "Command",
        },{
        caption: "camera shake",
            value: "camera shake",
            meta: "Command",
        },{
        caption: "camera teleport LOCATION_NAME",
            value: "camera teleport LOCATION_NAME",
            meta: "Command",
        },{
        caption: "camera zoom ZOOM_VALUE",
            value: "camera zoom ZOOM_VALUE",
            meta: "Command",
        },{
        caption: "character",
            value: "character",
            meta: "Command",
        },{
        caption: "classroom seats assigned",
            value: "classroom seats assigned",
            meta: "Command",
        },{
        caption: "drawing DRAWING_SPOT_KEY load TEXTURE_KEY",
            value: "drawing DRAWING_SPOT_KEY load TEXTURE_KEY",
            meta: "Command",
        },{
        caption: "draw DRAWING_SPOT_KEY TEXTURE_KEY",
            value: "draw DRAWING_SPOT_KEY TEXTURE_KEY",
            meta: "Command",
        },{
        caption: "battle_background_set BACKGROUND_NAME",
            value: "battle_background_set BACKGROUND_NAME",
            meta: "Command",
        },{
        caption: "start_battle ENCOUNTER_NAME",
            value: "start_battle ENCOUNTER_NAME",
            meta: "Command",
        },{
        caption: "restart_battle",
            value: "restart_battle",
            meta: "Command",
        },{
        caption: "status_remove CHARACTER_NAME STATUS_NAME",
            value: "status_remove CHARACTER_NAME STATUS_NAME",
            meta: "Command",
        },{
        caption: "status_add CHARACTER_NAME STATUS_NAME",
            value: "status_add CHARACTER_NAME STATUS_NAME",
            meta: "Command",
        },{
        caption: "combat_attack CHARACTER_NAME attack TARGET_NAME with MOVE_NAME",
            value: "combat_attack CHARACTER_NAME attack TARGET_NAME with MOVE_NAME",
            meta: "Command",
        },{
        caption: "has_gone CHARACTER_NAME HAS_GONE",
            value: "has_gone CHARACTER_NAME HAS_GONE",
            meta: "Command",
        },{
        caption: "player_turn",
            value: "player_turn",
            meta: "Command",
        },{
        caption: "combat_remove_all_listeners",
            value: "combat_remove_all_listeners",
            meta: "Command",
        },{
        caption: "on_enemy_turn_start ENEMY_NAME TRIGGER",
            value: "on_enemy_turn_start ENEMY_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_character_turn_end CHARACTER_NAME TRIGGER",
            value: "on_character_turn_end CHARACTER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_action_fail PLAYER_NAME TRIGGER",
            value: "on_player_action_fail PLAYER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_action_success PLAYER_NAME TRIGGER",
            value: "on_player_action_success PLAYER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_attack PLAYER_NAME TRIGGER",
            value: "on_player_attack PLAYER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_block_fail PLAYER_NAME TRIGGER",
            value: "on_player_block_fail PLAYER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_block_success PLAYER_NAME TRIGGER",
            value: "on_player_block_success PLAYER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_turn_start PLAYER_NAME TRIGGER",
            value: "on_player_turn_start PLAYER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_turn_end TRIGGER",
            value: "on_player_turn_end TRIGGER",
            meta: "Command",
        },{
        caption: "on_player_moved PLAYER_NAME TRIGGER",
            value: "on_player_moved PLAYER_NAME TRIGGER",
            meta: "Command",
        },{
        caption: "combat_pause",
            value: "combat_pause",
            meta: "Command",
        },{
        caption: "disable_move CHARACTER_NAME MOVE_NAME",
            value: "disable_move CHARACTER_NAME MOVE_NAME",
            meta: "Command",
        },{
        caption: "disable_all_moves CHARACTER_NAME",
            value: "disable_all_moves CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "enable_move CHARACTER_NAME MOVE_NAME",
            value: "enable_move CHARACTER_NAME MOVE_NAME",
            meta: "Command",
        },{
        caption: "enable_all_moves CHARACTER_NAME",
            value: "enable_all_moves CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "cut_dialog",
            value: "cut_dialog",
            meta: "Command",
        },{
        caption: "day_choices DAY_NUMBER",
            value: "day_choices DAY_NUMBER",
            meta: "Command",
        },{
        caption: "show_deadline",
            value: "show_deadline",
            meta: "Command",
        },{
        caption: "hide_deadline",
            value: "hide_deadline",
            meta: "Command",
        },{
        caption: "debug COMMAND",
            value: "debug COMMAND",
            meta: "Command",
        },{
        caption: "continue",
            value: "continue",
            meta: "Command",
        },{
        caption: "start_scene SCENE_NAME",
            value: "start_scene SCENE_NAME",
            meta: "Command",
        },{
        caption: "delay",
            value: "delay",
            meta: "Command",
        },{
        caption: "drive_into_dreamworld",
            value: "drive_into_dreamworld",
            meta: "Command",
        },{
        caption: "fmod_var VAR_NAME VALUE",
            value: "fmod_var VAR_NAME VALUE",
            meta: "Command",
        },{
        caption: "friend_link FRIEND_NAME LEVEL_NUM",
            value: "friend_link FRIEND_NAME LEVEL_NUM",
            meta: "Command",
        },{
        caption: "flag FLAG_NAME set VALUE",
            value: "flag FLAG_NAME set VALUE",
            meta: "Command",
        },{
        caption: "game_speed_set GAME_SPEED",
            value: "game_speed_set GAME_SPEED",
            meta: "Command",
        },{
        caption: "player_input KEY PROMPT",
            value: "player_input KEY PROMPT",
            meta: "Command",
        },{
        caption: "hide_all_speech_bubbles",
            value: "hide_all_speech_bubbles",
            meta: "Command",
        },{
        caption: "show_all_speech_bubbles",
            value: "show_all_speech_bubbles",
            meta: "Command",
        },{
        caption: "icon_update",
            value: "icon_update",
            meta: "Command",
        },{
        caption: "interactable_set INTERACTABLE_NAME ON/OFF",
            value: "interactable_set INTERACTABLE_NAME ON/OFF",
            meta: "Command",
        },{
        caption: "item ITEM_NAME position LOCATION_NAME",
            value: "item ITEM_NAME position LOCATION_NAME",
            meta: "Command",
        },{
        caption: "light_off",
            value: "light_off",
            meta: "Command",
        },{
        caption: "load_slots",
            value: "load_slots",
            meta: "Command",
        },{
        caption: "load_slots_loss",
            value: "load_slots_loss",
            meta: "Command",
        },{
        caption: "load_shadow_save SHADOW_SLOT_NUM",
            value: "load_shadow_save SHADOW_SLOT_NUM",
            meta: "Command",
        },{
        caption: "save_shadow_save SHADOW_SLOT_NUM",
            value: "save_shadow_save SHADOW_SLOT_NUM",
            meta: "Command",
        },{
        caption: "location LOCATION_NAME",
            value: "location LOCATION_NAME",
            meta: "Command",
        },{
        caption: "add_friend_links",
            value: "add_friend_links",
            meta: "Command",
        },{
        caption: "add_party_stats",
            value: "add_party_stats",
            meta: "Command",
        },{
        caption: "add_plastiks",
            value: "add_plastiks",
            meta: "Command",
        },{
        caption: "add_settings",
            value: "add_settings",
            meta: "Command",
        },{
        caption: "music stop",
            value: "music stop",
            meta: "Command",
        },{
        caption: "music fade_out FADE_TIME",
            value: "music fade_out FADE_TIME",
            meta: "Command",
        },{
        caption: "music fade_in SONG_NAME FADE_TIME",
            value: "music fade_in SONG_NAME FADE_TIME",
            meta: "Command",
        },{
        caption: "music loop ON/OFF",
            value: "music loop ON/OFF",
            meta: "Command",
        },{
        caption: "music SONG_NAME1 FADE_TIME",
            value: "music SONG_NAME1 FADE_TIME",
            meta: "Command",
        },{
        caption: "music SONG_NAME",
            value: "music SONG_NAME",
            meta: "Command",
        },{
        caption: "object OBJECT_NAME set_dialog SCENE_NAME",
            value: "object OBJECT_NAME set_dialog SCENE_NAME",
            meta: "Command",
        },{
        caption: "party_member_add CHARACTER_NAME",
            value: "party_member_add CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "party_member_remove CHARACTER_NAME",
            value: "party_member_remove CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "pause PAUSE_TIME",
            value: "pause PAUSE_TIME",
            meta: "Command",
        },{
        caption: "disable_pause",
            value: "disable_pause",
            meta: "Command",
        },{
        caption: "enable_pause",
            value: "enable_pause",
            meta: "Command",
        },{
        caption: "talker_block_closing",
            value: "talker_block_closing",
            meta: "Command",
        },{
        caption: "remove KEY",
            value: "remove KEY",
            meta: "Command",
        },{
        caption: "remove_star CHARACTER_NAME",
            value: "remove_star CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "save_slots",
            value: "save_slots",
            meta: "Command",
        },{
        caption: "sfx stop SFX_NAME",
            value: "sfx stop SFX_NAME",
            meta: "Command",
        },{
        caption: "help sfx stop SFX_NAME - Stop a specific sound",
            value: "help sfx stop SFX_NAME - Stop a specific sound",
            meta: "Command",
        },{
        caption: "sfx loop SFX_NAME ON/OFF",
            value: "sfx loop SFX_NAME ON/OFF",
            meta: "Command",
        },{
        caption: "sfx SFX_NAME",
            value: "sfx SFX_NAME",
            meta: "Command",
        },{
        caption: "start_day DAY_NUMBER",
            value: "start_day DAY_NUMBER",
            meta: "Command",
        },{
        caption: "start_next_day",
            value: "start_next_day",
            meta: "Command",
        },{
        caption: "sword_builder_on_confirm",
            value: "sword_builder_on_confirm",
            meta: "Command",
        },{
        caption: "show_sword_builder",
            value: "show_sword_builder",
            meta: "Command",
        },{
        caption: "time_of_day TIME_OF_DAY",
            value: "time_of_day TIME_OF_DAY",
            meta: "Command",
        },{
        caption: "help time_of_day TIME_OF_DAY - Sets the time of day. Affects lighting. morning, noon, afternooon, evening, night",
            value: "help time_of_day TIME_OF_DAY - Sets the time of day. Affects lighting. morning, noon, afternooon, evening, night",
            meta: "Command",
        },{
        caption: "titlescreen",
            value: "titlescreen",
            meta: "Command",
        },{
        caption: "move_unlock CHARACTER_NAME",
            value: "move_unlock CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "move_remove CHARACTER_NAME",
            value: "move_remove CHARACTER_NAME",
            meta: "Command",
        },{
        caption: "unlock_args NAME ARGUMENT_COUNT",
            value: "unlock_args NAME ARGUMENT_COUNT",
            meta: "Command",
        },{
        caption: "unlock NAME",
            value: "unlock NAME",
            meta: "Command",
        },{
        caption: "unblock",
            value: "unblock",
            meta: "Command",
        },{
        caption: "unpause",
            value: "unpause",
            meta: "Command",
        },{
        caption: "vfx VFX_NAME",
            value: "vfx VFX_NAME",
            meta: "Command",
        },{
        caption: "start_walk_and_talk",
            value: "start_walk_and_talk",
            meta: "Command",
        },





        // Character Commands



{
        caption: "character CHARACTER_NAME anim_layer_weight LAYER_NAME WEIGHT",
            value: "character CHARACTER_NAME anim_layer_weight LAYER_NAME WEIGHT",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME ai_control",
            value: "character CHARACTER_NAME ai_control",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME control",
            value: "character CHARACTER_NAME control",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME set_dialog SCENE_NAME",
            value: "character CHARACTER_NAME set_dialog SCENE_NAME",
            meta: "Character Command",
        },{
        caption: "help character CHARACTER_NAME set_dialog SCENE_NAME - sets the character's dialog when they are talked to",
            value: "help character CHARACTER_NAME set_dialog SCENE_NAME - sets the character's dialog when they are talked to",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME emote_set EMOTE_NAME IS_ACTIVE",
            value: "character CHARACTER_NAME emote_set EMOTE_NAME IS_ACTIVE",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME emote e_",
            value: "character CHARACTER_NAME emote e_",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME interact exit",
            value: "character CHARACTER_NAME interact exit",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME interact_immediate LOCATION_NAME",
            value: "character CHARACTER_NAME interact_immediate LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME interact TARGET_NAME",
            value: "character CHARACTER_NAME interact TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME follow TARGET_NAME",
            value: "character CHARACTER_NAME follow TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME stop follow",
            value: "character CHARACTER_NAME stop follow",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME hold ITEM_NAME",
            value: "character CHARACTER_NAME hold ITEM_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME place ITEM_NAME POSITION",
            value: "character CHARACTER_NAME place ITEM_NAME POSITION",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME hide",
            value: "character CHARACTER_NAME hide",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME show",
            value: "character CHARACTER_NAME show",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME set_layer LAYER_NUM",
            value: "character CHARACTER_NAME set_layer LAYER_NUM",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME look LOCATION_NAME",
            value: "character CHARACTER_NAME look LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME ondestination",
            value: "character CHARACTER_NAME ondestination",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME point right TARGET_NAME",
            value: "character CHARACTER_NAME point right TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME point_left TARGET_NAME",
            value: "character CHARACTER_NAME point_left TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME position LOCATION_NAME",
            value: "character CHARACTER_NAME position LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME position_offset OFFSET_X OFFSET_Y",
            value: "character CHARACTER_NAME position_offset OFFSET_X OFFSET_Y",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME position_relative_offset TARGET_POSITION_NAME OFFSET_X OFFSET_Y",
            value: "character CHARACTER_NAME position_relative_offset TARGET_POSITION_NAME OFFSET_X OFFSET_Y",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME reset",
            value: "character CHARACTER_NAME reset",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME run_speed SPEED",
            value: "character CHARACTER_NAME run_speed SPEED",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME run_to LOCATION_NAME",
            value: "character CHARACTER_NAME run_to LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME stop",
            value: "character CHARACTER_NAME stop",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME turn around",
            value: "character CHARACTER_NAME turn around",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME turn LOCATION_NAME",
            value: "character CHARACTER_NAME turn LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME throw ITEM_NAME TARGET on destination ON_DESTINATION",
            value: "character CHARACTER_NAME throw ITEM_NAME TARGET on destination ON_DESTINATION",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME blink",
            value: "character CHARACTER_NAME blink",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME blink_rapid",
            value: "character CHARACTER_NAME blink_rapid",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME set_outfit OUTFIT_NAME",
            value: "character CHARACTER_NAME set_outfit OUTFIT_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME close_eyes",
            value: "character CHARACTER_NAME close_eyes",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME set_sprite BODY_PART_NAME SPRITE_NAME",
            value: "character CHARACTER_NAME set_sprite BODY_PART_NAME SPRITE_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME open_eyes",
            value: "character CHARACTER_NAME open_eyes",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME quick_point_left TARGET_NAME",
            value: "character CHARACTER_NAME quick_point_left TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME quick_point_right TARGET_NAME",
            value: "character CHARACTER_NAME quick_point_right TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME walk_speed SPEED",
            value: "character CHARACTER_NAME walk_speed SPEED",
            meta: "Character Command",
        },{
        caption: "character CHARACTER_NAME walk_to LOCATION_NAME",
            value: "character CHARACTER_NAME walk_to LOCATION_NAME",
            meta: "Character Command",
        },



        // Characters
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






        // Locations
        {
        caption: "l_charlie_hallway",
            value: "l_charlie_hallway",
            meta: "Location",
        },{
        caption: "l_charlie_house",
            value: "l_charlie_house",
            meta: "Location",
        },{
        caption: "l_charlie_house_hallway",
            value: "l_charlie_house_hallway",
            meta: "Location",
        },{
        caption: "l_charlie_room",
            value: "l_charlie_room",
            meta: "Location",
        },{
        caption: "l_charlies_hallway",
            value: "l_charlies_hallway",
            meta: "Location",
        },{
        caption: "l_charlies_house",
            value: "l_charlies_house",
            meta: "Location",
        },{
        caption: "l_charlies_house_hallway",
            value: "l_charlies_house_hallway",
            meta: "Location",
        },{
        caption: "l_charlies_room",
            value: "l_charlies_room",
            meta: "Location",
        },{
        caption: "l_classroom",
            value: "l_classroom",
            meta: "Location",
        },{
        caption: "l_house_hallway",
            value: "l_house_hallway",
            meta: "Location",
        },{
        caption: "l_living_room",
            value: "l_living_room",
            meta: "Location",
        },{
        caption: "l_outside_school",
            value: "l_outside_school",
            meta: "Location",
        },{
        caption: "l_playground",
            value: "l_playground",
            meta: "Location",
        },{
        caption: "l_school_ext",
            value: "l_school_ext",
            meta: "Location",
        },{
        caption: "l_school_front",
            value: "l_school_front",
            meta: "Location",
        },{
        caption: "l_school_hallway",
            value: "l_school_hallway",
            meta: "Location",
        },{
        caption: "l_school_outside",
            value: "l_school_outside",
            meta: "Location",
        },




        // Positions
        {
        caption: "lp_charlie_hallway.stairs",
            value: "lp_charlie_hallway.stairs",
            meta: "Position",
        },{
        caption: "lp_charlie_hallway.charlies_door",
            value: "lp_charlie_hallway.charlies_door",
            meta: "Position",
        },{
        caption: "lp_charlie_hallway.none",
            value: "lp_charlie_hallway.none",
            meta: "Position",
        },{
        caption: "lp_charlie_hallway.absent",
            value: "lp_charlie_hallway.absent",
            meta: "Position",
        },{
        caption: "lp_charlie_house.stairs_top",
            value: "lp_charlie_house.stairs_top",
            meta: "Position",
        },{
        caption: "lp_charlie_house.door",
            value: "lp_charlie_house.door",
            meta: "Position",
        },{
        caption: "lp_charlie_house.entry",
            value: "lp_charlie_house.entry",
            meta: "Position",
        },{
        caption: "lp_charlie_house.window",
            value: "lp_charlie_house.window",
            meta: "Position",
        },{
        caption: "lp_charlie_house.stairs_middle",
            value: "lp_charlie_house.stairs_middle",
            meta: "Position",
        },{
        caption: "lp_charlie_house.stairs_bottom",
            value: "lp_charlie_house.stairs_bottom",
            meta: "Position",
        },{
        caption: "lp_charlie_house.lr_1",
            value: "lp_charlie_house.lr_1",
            meta: "Position",
        },{
        caption: "lp_charlie_house.lr_2",
            value: "lp_charlie_house.lr_2",
            meta: "Position",
        },{
        caption: "lp_charlie_house.lr_3",
            value: "lp_charlie_house.lr_3",
            meta: "Position",
        },{
        caption: "lp_charlie_house.lr_4",
            value: "lp_charlie_house.lr_4",
            meta: "Position",
        },{
        caption: "lp_charlie_house.lr_5",
            value: "lp_charlie_house.lr_5",
            meta: "Position",
        },{
        caption: "lp_charlie_house.lr_6",
            value: "lp_charlie_house.lr_6",
            meta: "Position",
        },{
        caption: "lp_charlie_house.lr_7",
            value: "lp_charlie_house.lr_7",
            meta: "Position",
        },{
        caption: "lp_charlie_house.rug_1",
            value: "lp_charlie_house.rug_1",
            meta: "Position",
        },{
        caption: "lp_charlie_house.rug_2",
            value: "lp_charlie_house.rug_2",
            meta: "Position",
        },{
        caption: "lp_charlie_house.rug_3",
            value: "lp_charlie_house.rug_3",
            meta: "Position",
        },{
        caption: "lp_charlie_house.rug_4",
            value: "lp_charlie_house.rug_4",
            meta: "Position",
        },{
        caption: "lp_charlie_house.rug_5",
            value: "lp_charlie_house.rug_5",
            meta: "Position",
        },{
        caption: "lp_charlie_house.rug_6",
            value: "lp_charlie_house.rug_6",
            meta: "Position",
        },{
        caption: "lp_charlie_house.rug_7",
            value: "lp_charlie_house.rug_7",
            meta: "Position",
        },{
        caption: "lp_charlie_house.kitchen_1",
            value: "lp_charlie_house.kitchen_1",
            meta: "Position",
        },{
        caption: "lp_charlie_house.kitchen_2",
            value: "lp_charlie_house.kitchen_2",
            meta: "Position",
        },{
        caption: "lp_charlie_house.kitchen_3",
            value: "lp_charlie_house.kitchen_3",
            meta: "Position",
        },{
        caption: "lp_charlie_house.kitchen_4",
            value: "lp_charlie_house.kitchen_4",
            meta: "Position",
        },{
        caption: "lp_charlie_house.kitchen_5",
            value: "lp_charlie_house.kitchen_5",
            meta: "Position",
        },{
        caption: "lp_charlie_house.dishwasher",
            value: "lp_charlie_house.dishwasher",
            meta: "Position",
        },{
        caption: "lp_charlie_house.sink",
            value: "lp_charlie_house.sink",
            meta: "Position",
        },{
        caption: "lp_charlie_house.oven",
            value: "lp_charlie_house.oven",
            meta: "Position",
        },{
        caption: "lp_charlie_house.fridge_1",
            value: "lp_charlie_house.fridge_1",
            meta: "Position",
        },{
        caption: "lp_charlie_house.fridge_2",
            value: "lp_charlie_house.fridge_2",
            meta: "Position",
        },{
        caption: "lp_charlie_house.table",
            value: "lp_charlie_house.table",
            meta: "Position",
        },{
        caption: "lp_charlie_house.chair_1",
            value: "lp_charlie_house.chair_1",
            meta: "Position",
        },{
        caption: "lp_charlie_house.chair_2",
            value: "lp_charlie_house.chair_2",
            meta: "Position",
        },{
        caption: "lp_charlie_house.chair_3",
            value: "lp_charlie_house.chair_3",
            meta: "Position",
        },{
        caption: "lp_charlie_house.chair_4",
            value: "lp_charlie_house.chair_4",
            meta: "Position",
        },{
        caption: "lp_charlie_house.couch_1",
            value: "lp_charlie_house.couch_1",
            meta: "Position",
        },{
        caption: "lp_charlie_house.couch_2",
            value: "lp_charlie_house.couch_2",
            meta: "Position",
        },{
        caption: "lp_charlie_house.couch_3",
            value: "lp_charlie_house.couch_3",
            meta: "Position",
        },{
        caption: "lp_charlie_house.couch_4",
            value: "lp_charlie_house.couch_4",
            meta: "Position",
        },{
        caption: "lp_charlie_house.cozy_chair",
            value: "lp_charlie_house.cozy_chair",
            meta: "Position",
        },{
        caption: "lp_charlie_house.void",
            value: "lp_charlie_house.void",
            meta: "Position",
        },{
        caption: "lp_charlie_house.absent",
            value: "lp_charlie_house.absent",
            meta: "Position",
        },{
        caption: "lp_charlie_house.none",
            value: "lp_charlie_house.none",
            meta: "Position",
        },{
        caption: "lp_charlie_house.window_2",
            value: "lp_charlie_house.window_2",
            meta: "Position",
        },{
        caption: "lp_charlie_house_hallway.stairs",
            value: "lp_charlie_house_hallway.stairs",
            meta: "Position",
        },{
        caption: "lp_charlie_house_hallway.charlies_door",
            value: "lp_charlie_house_hallway.charlies_door",
            meta: "Position",
        },{
        caption: "lp_charlie_house_hallway.none",
            value: "lp_charlie_house_hallway.none",
            meta: "Position",
        },{
        caption: "lp_charlie_house_hallway.absent",
            value: "lp_charlie_house_hallway.absent",
            meta: "Position",
        },{
        caption: "lp_charlie_room.absent",
            value: "lp_charlie_room.absent",
            meta: "Position",
        },{
        caption: "lp_charlie_room.none",
            value: "lp_charlie_room.none",
            meta: "Position",
        },{
        caption: "lp_charlie_room.middle",
            value: "lp_charlie_room.middle",
            meta: "Position",
        },{
        caption: "lp_charlie_room.outside",
            value: "lp_charlie_room.outside",
            meta: "Position",
        },{
        caption: "lp_charlie_room.door",
            value: "lp_charlie_room.door",
            meta: "Position",
        },{
        caption: "lp_charlie_room.hallway",
            value: "lp_charlie_room.hallway",
            meta: "Position",
        },{
        caption: "lp_charlie_room.shelf",
            value: "lp_charlie_room.shelf",
            meta: "Position",
        },{
        caption: "lp_charlie_room.toybox",
            value: "lp_charlie_room.toybox",
            meta: "Position",
        },{
        caption: "lp_charlie_room.sidetable",
            value: "lp_charlie_room.sidetable",
            meta: "Position",
        },{
        caption: "lp_charlie_room.bedside",
            value: "lp_charlie_room.bedside",
            meta: "Position",
        },{
        caption: "lp_charlie_room.bed",
            value: "lp_charlie_room.bed",
            meta: "Position",
        },{
        caption: "lp_charlie_room.center_1",
            value: "lp_charlie_room.center_1",
            meta: "Position",
        },{
        caption: "lp_charlie_room.center_2",
            value: "lp_charlie_room.center_2",
            meta: "Position",
        },{
        caption: "lp_charlie_room.center_3",
            value: "lp_charlie_room.center_3",
            meta: "Position",
        },{
        caption: "lp_charlie_room.desk",
            value: "lp_charlie_room.desk",
            meta: "Position",
        },{
        caption: "lp_charlie_room.trash",
            value: "lp_charlie_room.trash",
            meta: "Position",
        },{
        caption: "lp_charlie_room.window_1",
            value: "lp_charlie_room.window_1",
            meta: "Position",
        },{
        caption: "lp_charlie_room.window_2",
            value: "lp_charlie_room.window_2",
            meta: "Position",
        },{
        caption: "lp_charlie_room.hamper",
            value: "lp_charlie_room.hamper",
            meta: "Position",
        },{
        caption: "lp_charlie_room.sleep_bed",
            value: "lp_charlie_room.sleep_bed",
            meta: "Position",
        },{
        caption: "lp_charlie_room.dream_bed",
            value: "lp_charlie_room.dream_bed",
            meta: "Position",
        },{
        caption: "lp_charlie_room.sidetable_cup_position",
            value: "lp_charlie_room.sidetable_cup_position",
            meta: "Position",
        },{
        caption: "lp_charlie_room.lightswitch",
            value: "lp_charlie_room.lightswitch",
            meta: "Position",
        },{
        caption: "lp_charlies_hallway.stairs",
            value: "lp_charlies_hallway.stairs",
            meta: "Position",
        },{
        caption: "lp_charlies_hallway.charlies_door",
            value: "lp_charlies_hallway.charlies_door",
            meta: "Position",
        },{
        caption: "lp_charlies_hallway.none",
            value: "lp_charlies_hallway.none",
            meta: "Position",
        },{
        caption: "lp_charlies_hallway.absent",
            value: "lp_charlies_hallway.absent",
            meta: "Position",
        },{
        caption: "lp_charlies_house.stairs_top",
            value: "lp_charlies_house.stairs_top",
            meta: "Position",
        },{
        caption: "lp_charlies_house.door",
            value: "lp_charlies_house.door",
            meta: "Position",
        },{
        caption: "lp_charlies_house.entry",
            value: "lp_charlies_house.entry",
            meta: "Position",
        },{
        caption: "lp_charlies_house.window",
            value: "lp_charlies_house.window",
            meta: "Position",
        },{
        caption: "lp_charlies_house.stairs_middle",
            value: "lp_charlies_house.stairs_middle",
            meta: "Position",
        },{
        caption: "lp_charlies_house.stairs_bottom",
            value: "lp_charlies_house.stairs_bottom",
            meta: "Position",
        },{
        caption: "lp_charlies_house.lr_1",
            value: "lp_charlies_house.lr_1",
            meta: "Position",
        },{
        caption: "lp_charlies_house.lr_2",
            value: "lp_charlies_house.lr_2",
            meta: "Position",
        },{
        caption: "lp_charlies_house.lr_3",
            value: "lp_charlies_house.lr_3",
            meta: "Position",
        },{
        caption: "lp_charlies_house.lr_4",
            value: "lp_charlies_house.lr_4",
            meta: "Position",
        },{
        caption: "lp_charlies_house.lr_5",
            value: "lp_charlies_house.lr_5",
            meta: "Position",
        },{
        caption: "lp_charlies_house.lr_6",
            value: "lp_charlies_house.lr_6",
            meta: "Position",
        },{
        caption: "lp_charlies_house.lr_7",
            value: "lp_charlies_house.lr_7",
            meta: "Position",
        },{
        caption: "lp_charlies_house.rug_1",
            value: "lp_charlies_house.rug_1",
            meta: "Position",
        },{
        caption: "lp_charlies_house.rug_2",
            value: "lp_charlies_house.rug_2",
            meta: "Position",
        },{
        caption: "lp_charlies_house.rug_3",
            value: "lp_charlies_house.rug_3",
            meta: "Position",
        },{
        caption: "lp_charlies_house.rug_4",
            value: "lp_charlies_house.rug_4",
            meta: "Position",
        },{
        caption: "lp_charlies_house.rug_5",
            value: "lp_charlies_house.rug_5",
            meta: "Position",
        },{
        caption: "lp_charlies_house.rug_6",
            value: "lp_charlies_house.rug_6",
            meta: "Position",
        },{
        caption: "lp_charlies_house.rug_7",
            value: "lp_charlies_house.rug_7",
            meta: "Position",
        },{
        caption: "lp_charlies_house.kitchen_1",
            value: "lp_charlies_house.kitchen_1",
            meta: "Position",
        },{
        caption: "lp_charlies_house.kitchen_2",
            value: "lp_charlies_house.kitchen_2",
            meta: "Position",
        },{
        caption: "lp_charlies_house.kitchen_3",
            value: "lp_charlies_house.kitchen_3",
            meta: "Position",
        },{
        caption: "lp_charlies_house.kitchen_4",
            value: "lp_charlies_house.kitchen_4",
            meta: "Position",
        },{
        caption: "lp_charlies_house.kitchen_5",
            value: "lp_charlies_house.kitchen_5",
            meta: "Position",
        },{
        caption: "lp_charlies_house.dishwasher",
            value: "lp_charlies_house.dishwasher",
            meta: "Position",
        },{
        caption: "lp_charlies_house.sink",
            value: "lp_charlies_house.sink",
            meta: "Position",
        },{
        caption: "lp_charlies_house.oven",
            value: "lp_charlies_house.oven",
            meta: "Position",
        },{
        caption: "lp_charlies_house.fridge_1",
            value: "lp_charlies_house.fridge_1",
            meta: "Position",
        },{
        caption: "lp_charlies_house.fridge_2",
            value: "lp_charlies_house.fridge_2",
            meta: "Position",
        },{
        caption: "lp_charlies_house.table",
            value: "lp_charlies_house.table",
            meta: "Position",
        },{
        caption: "lp_charlies_house.chair_1",
            value: "lp_charlies_house.chair_1",
            meta: "Position",
        },{
        caption: "lp_charlies_house.chair_2",
            value: "lp_charlies_house.chair_2",
            meta: "Position",
        },{
        caption: "lp_charlies_house.chair_3",
            value: "lp_charlies_house.chair_3",
            meta: "Position",
        },{
        caption: "lp_charlies_house.chair_4",
            value: "lp_charlies_house.chair_4",
            meta: "Position",
        },{
        caption: "lp_charlies_house.couch_1",
            value: "lp_charlies_house.couch_1",
            meta: "Position",
        },{
        caption: "lp_charlies_house.couch_2",
            value: "lp_charlies_house.couch_2",
            meta: "Position",
        },{
        caption: "lp_charlies_house.couch_3",
            value: "lp_charlies_house.couch_3",
            meta: "Position",
        },{
        caption: "lp_charlies_house.couch_4",
            value: "lp_charlies_house.couch_4",
            meta: "Position",
        },{
        caption: "lp_charlies_house.cozy_chair",
            value: "lp_charlies_house.cozy_chair",
            meta: "Position",
        },{
        caption: "lp_charlies_house.void",
            value: "lp_charlies_house.void",
            meta: "Position",
        },{
        caption: "lp_charlies_house.absent",
            value: "lp_charlies_house.absent",
            meta: "Position",
        },{
        caption: "lp_charlies_house.none",
            value: "lp_charlies_house.none",
            meta: "Position",
        },{
        caption: "lp_charlies_house.window_2",
            value: "lp_charlies_house.window_2",
            meta: "Position",
        },{
        caption: "lp_charlies_house_hallway.stairs",
            value: "lp_charlies_house_hallway.stairs",
            meta: "Position",
        },{
        caption: "lp_charlies_house_hallway.charlies_door",
            value: "lp_charlies_house_hallway.charlies_door",
            meta: "Position",
        },{
        caption: "lp_charlies_house_hallway.none",
            value: "lp_charlies_house_hallway.none",
            meta: "Position",
        },{
        caption: "lp_charlies_house_hallway.absent",
            value: "lp_charlies_house_hallway.absent",
            meta: "Position",
        },{
        caption: "lp_charlies_room.absent",
            value: "lp_charlies_room.absent",
            meta: "Position",
        },{
        caption: "lp_charlies_room.none",
            value: "lp_charlies_room.none",
            meta: "Position",
        },{
        caption: "lp_charlies_room.middle",
            value: "lp_charlies_room.middle",
            meta: "Position",
        },{
        caption: "lp_charlies_room.outside",
            value: "lp_charlies_room.outside",
            meta: "Position",
        },{
        caption: "lp_charlies_room.door",
            value: "lp_charlies_room.door",
            meta: "Position",
        },{
        caption: "lp_charlies_room.hallway",
            value: "lp_charlies_room.hallway",
            meta: "Position",
        },{
        caption: "lp_charlies_room.shelf",
            value: "lp_charlies_room.shelf",
            meta: "Position",
        },{
        caption: "lp_charlies_room.toybox",
            value: "lp_charlies_room.toybox",
            meta: "Position",
        },{
        caption: "lp_charlies_room.sidetable",
            value: "lp_charlies_room.sidetable",
            meta: "Position",
        },{
        caption: "lp_charlies_room.bedside",
            value: "lp_charlies_room.bedside",
            meta: "Position",
        },{
        caption: "lp_charlies_room.bed",
            value: "lp_charlies_room.bed",
            meta: "Position",
        },{
        caption: "lp_charlies_room.center_1",
            value: "lp_charlies_room.center_1",
            meta: "Position",
        },{
        caption: "lp_charlies_room.center_2",
            value: "lp_charlies_room.center_2",
            meta: "Position",
        },{
        caption: "lp_charlies_room.center_3",
            value: "lp_charlies_room.center_3",
            meta: "Position",
        },{
        caption: "lp_charlies_room.desk",
            value: "lp_charlies_room.desk",
            meta: "Position",
        },{
        caption: "lp_charlies_room.trash",
            value: "lp_charlies_room.trash",
            meta: "Position",
        },{
        caption: "lp_charlies_room.window_1",
            value: "lp_charlies_room.window_1",
            meta: "Position",
        },{
        caption: "lp_charlies_room.window_2",
            value: "lp_charlies_room.window_2",
            meta: "Position",
        },{
        caption: "lp_charlies_room.hamper",
            value: "lp_charlies_room.hamper",
            meta: "Position",
        },{
        caption: "lp_charlies_room.sleep_bed",
            value: "lp_charlies_room.sleep_bed",
            meta: "Position",
        },{
        caption: "lp_charlies_room.dream_bed",
            value: "lp_charlies_room.dream_bed",
            meta: "Position",
        },{
        caption: "lp_charlies_room.sidetable_cup_position",
            value: "lp_charlies_room.sidetable_cup_position",
            meta: "Position",
        },{
        caption: "lp_charlies_room.lightswitch",
            value: "lp_charlies_room.lightswitch",
            meta: "Position",
        },{
        caption: "lp_classroom.front1",
            value: "lp_classroom.front1",
            meta: "Position",
        },{
        caption: "lp_classroom.back",
            value: "lp_classroom.back",
            meta: "Position",
        },{
        caption: "lp_classroom.kaden_desk",
            value: "lp_classroom.kaden_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.bria_desk",
            value: "lp_classroom.bria_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.mason_desk",
            value: "lp_classroom.mason_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.jason_desk",
            value: "lp_classroom.jason_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.dustin_desk",
            value: "lp_classroom.dustin_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.eliana_desk",
            value: "lp_classroom.eliana_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.logan_desk",
            value: "lp_classroom.logan_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.charlie_desk",
            value: "lp_classroom.charlie_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.sky_desk",
            value: "lp_classroom.sky_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.brownie_desk",
            value: "lp_classroom.brownie_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.juliette_desk",
            value: "lp_classroom.juliette_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.nicole_desk",
            value: "lp_classroom.nicole_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.riley_desk",
            value: "lp_classroom.riley_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.erika_desk",
            value: "lp_classroom.erika_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.alex_desk",
            value: "lp_classroom.alex_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.connor_desk",
            value: "lp_classroom.connor_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.absent",
            value: "lp_classroom.absent",
            meta: "Position",
        },{
        caption: "lp_classroom.none",
            value: "lp_classroom.none",
            meta: "Position",
        },{
        caption: "lp_classroom.middle",
            value: "lp_classroom.middle",
            meta: "Position",
        },{
        caption: "lp_classroom.outside",
            value: "lp_classroom.outside",
            meta: "Position",
        },{
        caption: "lp_classroom.door",
            value: "lp_classroom.door",
            meta: "Position",
        },{
        caption: "lp_classroom.front2",
            value: "lp_classroom.front2",
            meta: "Position",
        },{
        caption: "lp_classroom.front3",
            value: "lp_classroom.front3",
            meta: "Position",
        },{
        caption: "lp_classroom.front4",
            value: "lp_classroom.front4",
            meta: "Position",
        },{
        caption: "lp_classroom.teacher_desk",
            value: "lp_classroom.teacher_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.whiteboard_1",
            value: "lp_classroom.whiteboard_1",
            meta: "Position",
        },{
        caption: "lp_classroom.whiteboard_2",
            value: "lp_classroom.whiteboard_2",
            meta: "Position",
        },{
        caption: "lp_classroom.question_desk",
            value: "lp_classroom.question_desk",
            meta: "Position",
        },{
        caption: "lp_classroom.window_1",
            value: "lp_classroom.window_1",
            meta: "Position",
        },{
        caption: "lp_classroom.window_2",
            value: "lp_classroom.window_2",
            meta: "Position",
        },{
        caption: "lp_classroom.window_3",
            value: "lp_classroom.window_3",
            meta: "Position",
        },{
        caption: "lp_classroom.window_4",
            value: "lp_classroom.window_4",
            meta: "Position",
        },{
        caption: "lp_classroom.cubby_1",
            value: "lp_classroom.cubby_1",
            meta: "Position",
        },{
        caption: "lp_classroom.cubby_2",
            value: "lp_classroom.cubby_2",
            meta: "Position",
        },{
        caption: "lp_classroom.teacher_corner",
            value: "lp_classroom.teacher_corner",
            meta: "Position",
        },{
        caption: "lp_classroom.drawing_cursor",
            value: "lp_classroom.drawing_cursor",
            meta: "Position",
        },{
        caption: "lp_house_hallway.stairs",
            value: "lp_house_hallway.stairs",
            meta: "Position",
        },{
        caption: "lp_house_hallway.charlies_door",
            value: "lp_house_hallway.charlies_door",
            meta: "Position",
        },{
        caption: "lp_house_hallway.none",
            value: "lp_house_hallway.none",
            meta: "Position",
        },{
        caption: "lp_house_hallway.absent",
            value: "lp_house_hallway.absent",
            meta: "Position",
        },{
        caption: "lp_living_room.stairs_top",
            value: "lp_living_room.stairs_top",
            meta: "Position",
        },{
        caption: "lp_living_room.door",
            value: "lp_living_room.door",
            meta: "Position",
        },{
        caption: "lp_living_room.entry",
            value: "lp_living_room.entry",
            meta: "Position",
        },{
        caption: "lp_living_room.window",
            value: "lp_living_room.window",
            meta: "Position",
        },{
        caption: "lp_living_room.stairs_middle",
            value: "lp_living_room.stairs_middle",
            meta: "Position",
        },{
        caption: "lp_living_room.stairs_bottom",
            value: "lp_living_room.stairs_bottom",
            meta: "Position",
        },{
        caption: "lp_living_room.lr_1",
            value: "lp_living_room.lr_1",
            meta: "Position",
        },{
        caption: "lp_living_room.lr_2",
            value: "lp_living_room.lr_2",
            meta: "Position",
        },{
        caption: "lp_living_room.lr_3",
            value: "lp_living_room.lr_3",
            meta: "Position",
        },{
        caption: "lp_living_room.lr_4",
            value: "lp_living_room.lr_4",
            meta: "Position",
        },{
        caption: "lp_living_room.lr_5",
            value: "lp_living_room.lr_5",
            meta: "Position",
        },{
        caption: "lp_living_room.lr_6",
            value: "lp_living_room.lr_6",
            meta: "Position",
        },{
        caption: "lp_living_room.lr_7",
            value: "lp_living_room.lr_7",
            meta: "Position",
        },{
        caption: "lp_living_room.rug_1",
            value: "lp_living_room.rug_1",
            meta: "Position",
        },{
        caption: "lp_living_room.rug_2",
            value: "lp_living_room.rug_2",
            meta: "Position",
        },{
        caption: "lp_living_room.rug_3",
            value: "lp_living_room.rug_3",
            meta: "Position",
        },{
        caption: "lp_living_room.rug_4",
            value: "lp_living_room.rug_4",
            meta: "Position",
        },{
        caption: "lp_living_room.rug_5",
            value: "lp_living_room.rug_5",
            meta: "Position",
        },{
        caption: "lp_living_room.rug_6",
            value: "lp_living_room.rug_6",
            meta: "Position",
        },{
        caption: "lp_living_room.rug_7",
            value: "lp_living_room.rug_7",
            meta: "Position",
        },{
        caption: "lp_living_room.kitchen_1",
            value: "lp_living_room.kitchen_1",
            meta: "Position",
        },{
        caption: "lp_living_room.kitchen_2",
            value: "lp_living_room.kitchen_2",
            meta: "Position",
        },{
        caption: "lp_living_room.kitchen_3",
            value: "lp_living_room.kitchen_3",
            meta: "Position",
        },{
        caption: "lp_living_room.kitchen_4",
            value: "lp_living_room.kitchen_4",
            meta: "Position",
        },{
        caption: "lp_living_room.kitchen_5",
            value: "lp_living_room.kitchen_5",
            meta: "Position",
        },{
        caption: "lp_living_room.dishwasher",
            value: "lp_living_room.dishwasher",
            meta: "Position",
        },{
        caption: "lp_living_room.sink",
            value: "lp_living_room.sink",
            meta: "Position",
        },{
        caption: "lp_living_room.oven",
            value: "lp_living_room.oven",
            meta: "Position",
        },{
        caption: "lp_living_room.fridge_1",
            value: "lp_living_room.fridge_1",
            meta: "Position",
        },{
        caption: "lp_living_room.fridge_2",
            value: "lp_living_room.fridge_2",
            meta: "Position",
        },{
        caption: "lp_living_room.table",
            value: "lp_living_room.table",
            meta: "Position",
        },{
        caption: "lp_living_room.chair_1",
            value: "lp_living_room.chair_1",
            meta: "Position",
        },{
        caption: "lp_living_room.chair_2",
            value: "lp_living_room.chair_2",
            meta: "Position",
        },{
        caption: "lp_living_room.chair_3",
            value: "lp_living_room.chair_3",
            meta: "Position",
        },{
        caption: "lp_living_room.chair_4",
            value: "lp_living_room.chair_4",
            meta: "Position",
        },{
        caption: "lp_living_room.couch_1",
            value: "lp_living_room.couch_1",
            meta: "Position",
        },{
        caption: "lp_living_room.couch_2",
            value: "lp_living_room.couch_2",
            meta: "Position",
        },{
        caption: "lp_living_room.couch_3",
            value: "lp_living_room.couch_3",
            meta: "Position",
        },{
        caption: "lp_living_room.couch_4",
            value: "lp_living_room.couch_4",
            meta: "Position",
        },{
        caption: "lp_living_room.cozy_chair",
            value: "lp_living_room.cozy_chair",
            meta: "Position",
        },{
        caption: "lp_living_room.void",
            value: "lp_living_room.void",
            meta: "Position",
        },{
        caption: "lp_living_room.absent",
            value: "lp_living_room.absent",
            meta: "Position",
        },{
        caption: "lp_living_room.none",
            value: "lp_living_room.none",
            meta: "Position",
        },{
        caption: "lp_living_room.window_2",
            value: "lp_living_room.window_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.clovis_window",
            value: "lp_outside_school.clovis_window",
            meta: "Position",
        },{
        caption: "lp_outside_school.cool_kid_wall",
            value: "lp_outside_school.cool_kid_wall",
            meta: "Position",
        },{
        caption: "lp_outside_school.main_window_1",
            value: "lp_outside_school.main_window_1",
            meta: "Position",
        },{
        caption: "lp_outside_school.main_window_2",
            value: "lp_outside_school.main_window_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.door_1",
            value: "lp_outside_school.door_1",
            meta: "Position",
        },{
        caption: "lp_outside_school.door_2",
            value: "lp_outside_school.door_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.door_center",
            value: "lp_outside_school.door_center",
            meta: "Position",
        },{
        caption: "lp_outside_school.school_inside",
            value: "lp_outside_school.school_inside",
            meta: "Position",
        },{
        caption: "lp_outside_school.entrance_1",
            value: "lp_outside_school.entrance_1",
            meta: "Position",
        },{
        caption: "lp_outside_school.entrance_2",
            value: "lp_outside_school.entrance_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.entrance_3",
            value: "lp_outside_school.entrance_3",
            meta: "Position",
        },{
        caption: "lp_outside_school.entrance_4",
            value: "lp_outside_school.entrance_4",
            meta: "Position",
        },{
        caption: "lp_outside_school.entrance_5",
            value: "lp_outside_school.entrance_5",
            meta: "Position",
        },{
        caption: "lp_outside_school.entrance_6",
            value: "lp_outside_school.entrance_6",
            meta: "Position",
        },{
        caption: "lp_outside_school.flagpole_1",
            value: "lp_outside_school.flagpole_1",
            meta: "Position",
        },{
        caption: "lp_outside_school.flagpole_2",
            value: "lp_outside_school.flagpole_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.far_corner",
            value: "lp_outside_school.far_corner",
            meta: "Position",
        },{
        caption: "lp_outside_school.stairs_1",
            value: "lp_outside_school.stairs_1",
            meta: "Position",
        },{
        caption: "lp_outside_school.stairs_2",
            value: "lp_outside_school.stairs_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.stairs_3",
            value: "lp_outside_school.stairs_3",
            meta: "Position",
        },{
        caption: "lp_outside_school.sidewalk_1",
            value: "lp_outside_school.sidewalk_1",
            meta: "Position",
        },{
        caption: "lp_outside_school.sidewalk_2",
            value: "lp_outside_school.sidewalk_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.sidewalk_3",
            value: "lp_outside_school.sidewalk_3",
            meta: "Position",
        },{
        caption: "lp_outside_school.waiting_area_1",
            value: "lp_outside_school.waiting_area_1",
            meta: "Position",
        },{
        caption: "lp_outside_school.waiting_area_2",
            value: "lp_outside_school.waiting_area_2",
            meta: "Position",
        },{
        caption: "lp_outside_school.to_town",
            value: "lp_outside_school.to_town",
            meta: "Position",
        },{
        caption: "lp_outside_school.school",
            value: "lp_outside_school.school",
            meta: "Position",
        },{
        caption: "lp_outside_school.door",
            value: "lp_outside_school.door",
            meta: "Position",
        },{
        caption: "lp_outside_school.stairs_4",
            value: "lp_outside_school.stairs_4",
            meta: "Position",
        },{
        caption: "lp_outside_school.absent",
            value: "lp_outside_school.absent",
            meta: "Position",
        },{
        caption: "lp_outside_school.none",
            value: "lp_outside_school.none",
            meta: "Position",
        },{
        caption: "lp_playground.absent",
            value: "lp_playground.absent",
            meta: "Position",
        },{
        caption: "lp_playground.none",
            value: "lp_playground.none",
            meta: "Position",
        },{
        caption: "lp_playground.school",
            value: "lp_playground.school",
            meta: "Position",
        },{
        caption: "lp_playground.sidewalk",
            value: "lp_playground.sidewalk",
            meta: "Position",
        },{
        caption: "lp_playground.playground_center",
            value: "lp_playground.playground_center",
            meta: "Position",
        },{
        caption: "lp_playground.playground_1",
            value: "lp_playground.playground_1",
            meta: "Position",
        },{
        caption: "lp_playground.playground_2",
            value: "lp_playground.playground_2",
            meta: "Position",
        },{
        caption: "lp_playground.playground_3",
            value: "lp_playground.playground_3",
            meta: "Position",
        },{
        caption: "lp_playground.playground_4",
            value: "lp_playground.playground_4",
            meta: "Position",
        },{
        caption: "lp_playground.playground_5",
            value: "lp_playground.playground_5",
            meta: "Position",
        },{
        caption: "lp_playground.dragon_1",
            value: "lp_playground.dragon_1",
            meta: "Position",
        },{
        caption: "lp_playground.dragon_2",
            value: "lp_playground.dragon_2",
            meta: "Position",
        },{
        caption: "lp_playground.monkeybar_left",
            value: "lp_playground.monkeybar_left",
            meta: "Position",
        },{
        caption: "lp_playground.monkeybar_under",
            value: "lp_playground.monkeybar_under",
            meta: "Position",
        },{
        caption: "lp_playground.monkeybar_center",
            value: "lp_playground.monkeybar_center",
            meta: "Position",
        },{
        caption: "lp_playground.monkeybar_right",
            value: "lp_playground.monkeybar_right",
            meta: "Position",
        },{
        caption: "lp_playground.slide_stairs",
            value: "lp_playground.slide_stairs",
            meta: "Position",
        },{
        caption: "lp_playground.slide_bottom",
            value: "lp_playground.slide_bottom",
            meta: "Position",
        },{
        caption: "lp_playground.swing_1",
            value: "lp_playground.swing_1",
            meta: "Position",
        },{
        caption: "lp_playground.swing_2",
            value: "lp_playground.swing_2",
            meta: "Position",
        },{
        caption: "lp_playground.seesaw_1",
            value: "lp_playground.seesaw_1",
            meta: "Position",
        },{
        caption: "lp_playground.seesaw_2",
            value: "lp_playground.seesaw_2",
            meta: "Position",
        },{
        caption: "lp_playground.seesaw_front",
            value: "lp_playground.seesaw_front",
            meta: "Position",
        },{
        caption: "lp_playground.grass_1",
            value: "lp_playground.grass_1",
            meta: "Position",
        },{
        caption: "lp_playground.grass_2",
            value: "lp_playground.grass_2",
            meta: "Position",
        },{
        caption: "lp_playground.bench_1",
            value: "lp_playground.bench_1",
            meta: "Position",
        },{
        caption: "lp_playground.bench_2",
            value: "lp_playground.bench_2",
            meta: "Position",
        },{
        caption: "lp_playground.fence_1",
            value: "lp_playground.fence_1",
            meta: "Position",
        },{
        caption: "lp_playground.fence_2",
            value: "lp_playground.fence_2",
            meta: "Position",
        },{
        caption: "lp_playground.fence_3",
            value: "lp_playground.fence_3",
            meta: "Position",
        },{
        caption: "lp_playground.fence_4",
            value: "lp_playground.fence_4",
            meta: "Position",
        },{
        caption: "lp_playground.slide_railing_1",
            value: "lp_playground.slide_railing_1",
            meta: "Position",
        },{
        caption: "lp_playground.slide_railing_2",
            value: "lp_playground.slide_railing_2",
            meta: "Position",
        },{
        caption: "lp_playground.slide_platform",
            value: "lp_playground.slide_platform",
            meta: "Position",
        },{
        caption: "lp_playground.slide_top_1",
            value: "lp_playground.slide_top_1",
            meta: "Position",
        },{
        caption: "lp_playground.slide_top_2",
            value: "lp_playground.slide_top_2",
            meta: "Position",
        },{
        caption: "lp_playground.playground_6",
            value: "lp_playground.playground_6",
            meta: "Position",
        },{
        caption: "lp_playground.slide_bottom_2",
            value: "lp_playground.slide_bottom_2",
            meta: "Position",
        },{
        caption: "lp_playground.monkeybar",
            value: "lp_playground.monkeybar",
            meta: "Position",
        },{
        caption: "lp_playground.swing_1_non_sitting",
            value: "lp_playground.swing_1_non_sitting",
            meta: "Position",
        },{
        caption: "lp_playground.swing_2_non_sitting",
            value: "lp_playground.swing_2_non_sitting",
            meta: "Position",
        },{
        caption: "lp_playground.slide_top_3",
            value: "lp_playground.slide_top_3",
            meta: "Position",
        },{
        caption: "lp_school_ext.clovis_window",
            value: "lp_school_ext.clovis_window",
            meta: "Position",
        },{
        caption: "lp_school_ext.cool_kid_wall",
            value: "lp_school_ext.cool_kid_wall",
            meta: "Position",
        },{
        caption: "lp_school_ext.main_window_1",
            value: "lp_school_ext.main_window_1",
            meta: "Position",
        },{
        caption: "lp_school_ext.main_window_2",
            value: "lp_school_ext.main_window_2",
            meta: "Position",
        },{
        caption: "lp_school_ext.door_1",
            value: "lp_school_ext.door_1",
            meta: "Position",
        },{
        caption: "lp_school_ext.door_2",
            value: "lp_school_ext.door_2",
            meta: "Position",
        },{
        caption: "lp_school_ext.door_center",
            value: "lp_school_ext.door_center",
            meta: "Position",
        },{
        caption: "lp_school_ext.school_inside",
            value: "lp_school_ext.school_inside",
            meta: "Position",
        },{
        caption: "lp_school_ext.entrance_1",
            value: "lp_school_ext.entrance_1",
            meta: "Position",
        },{
        caption: "lp_school_ext.entrance_2",
            value: "lp_school_ext.entrance_2",
            meta: "Position",
        },{
        caption: "lp_school_ext.entrance_3",
            value: "lp_school_ext.entrance_3",
            meta: "Position",
        },{
        caption: "lp_school_ext.entrance_4",
            value: "lp_school_ext.entrance_4",
            meta: "Position",
        },{
        caption: "lp_school_ext.entrance_5",
            value: "lp_school_ext.entrance_5",
            meta: "Position",
        },{
        caption: "lp_school_ext.entrance_6",
            value: "lp_school_ext.entrance_6",
            meta: "Position",
        },{
        caption: "lp_school_ext.flagpole_1",
            value: "lp_school_ext.flagpole_1",
            meta: "Position",
        },{
        caption: "lp_school_ext.flagpole_2",
            value: "lp_school_ext.flagpole_2",
            meta: "Position",
        },{
        caption: "lp_school_ext.far_corner",
            value: "lp_school_ext.far_corner",
            meta: "Position",
        },{
        caption: "lp_school_ext.stairs_1",
            value: "lp_school_ext.stairs_1",
            meta: "Position",
        },{
        caption: "lp_school_ext.stairs_2",
            value: "lp_school_ext.stairs_2",
            meta: "Position",
        },{
        caption: "lp_school_ext.stairs_3",
            value: "lp_school_ext.stairs_3",
            meta: "Position",
        },{
        caption: "lp_school_ext.sidewalk_1",
            value: "lp_school_ext.sidewalk_1",
            meta: "Position",
        },{
        caption: "lp_school_ext.sidewalk_2",
            value: "lp_school_ext.sidewalk_2",
            meta: "Position",
        },{
        caption: "lp_school_ext.sidewalk_3",
            value: "lp_school_ext.sidewalk_3",
            meta: "Position",
        },{
        caption: "lp_school_ext.waiting_area_1",
            value: "lp_school_ext.waiting_area_1",
            meta: "Position",
        },{
        caption: "lp_school_ext.waiting_area_2",
            value: "lp_school_ext.waiting_area_2",
            meta: "Position",
        },{
        caption: "lp_school_ext.to_town",
            value: "lp_school_ext.to_town",
            meta: "Position",
        },{
        caption: "lp_school_ext.school",
            value: "lp_school_ext.school",
            meta: "Position",
        },{
        caption: "lp_school_ext.door",
            value: "lp_school_ext.door",
            meta: "Position",
        },{
        caption: "lp_school_ext.stairs_4",
            value: "lp_school_ext.stairs_4",
            meta: "Position",
        },{
        caption: "lp_school_ext.absent",
            value: "lp_school_ext.absent",
            meta: "Position",
        },{
        caption: "lp_school_ext.none",
            value: "lp_school_ext.none",
            meta: "Position",
        },{
        caption: "lp_school_front.clovis_window",
            value: "lp_school_front.clovis_window",
            meta: "Position",
        },{
        caption: "lp_school_front.cool_kid_wall",
            value: "lp_school_front.cool_kid_wall",
            meta: "Position",
        },{
        caption: "lp_school_front.main_window_1",
            value: "lp_school_front.main_window_1",
            meta: "Position",
        },{
        caption: "lp_school_front.main_window_2",
            value: "lp_school_front.main_window_2",
            meta: "Position",
        },{
        caption: "lp_school_front.door_1",
            value: "lp_school_front.door_1",
            meta: "Position",
        },{
        caption: "lp_school_front.door_2",
            value: "lp_school_front.door_2",
            meta: "Position",
        },{
        caption: "lp_school_front.door_center",
            value: "lp_school_front.door_center",
            meta: "Position",
        },{
        caption: "lp_school_front.school_inside",
            value: "lp_school_front.school_inside",
            meta: "Position",
        },{
        caption: "lp_school_front.entrance_1",
            value: "lp_school_front.entrance_1",
            meta: "Position",
        },{
        caption: "lp_school_front.entrance_2",
            value: "lp_school_front.entrance_2",
            meta: "Position",
        },{
        caption: "lp_school_front.entrance_3",
            value: "lp_school_front.entrance_3",
            meta: "Position",
        },{
        caption: "lp_school_front.entrance_4",
            value: "lp_school_front.entrance_4",
            meta: "Position",
        },{
        caption: "lp_school_front.entrance_5",
            value: "lp_school_front.entrance_5",
            meta: "Position",
        },{
        caption: "lp_school_front.entrance_6",
            value: "lp_school_front.entrance_6",
            meta: "Position",
        },{
        caption: "lp_school_front.flagpole_1",
            value: "lp_school_front.flagpole_1",
            meta: "Position",
        },{
        caption: "lp_school_front.flagpole_2",
            value: "lp_school_front.flagpole_2",
            meta: "Position",
        },{
        caption: "lp_school_front.far_corner",
            value: "lp_school_front.far_corner",
            meta: "Position",
        },{
        caption: "lp_school_front.stairs_1",
            value: "lp_school_front.stairs_1",
            meta: "Position",
        },{
        caption: "lp_school_front.stairs_2",
            value: "lp_school_front.stairs_2",
            meta: "Position",
        },{
        caption: "lp_school_front.stairs_3",
            value: "lp_school_front.stairs_3",
            meta: "Position",
        },{
        caption: "lp_school_front.sidewalk_1",
            value: "lp_school_front.sidewalk_1",
            meta: "Position",
        },{
        caption: "lp_school_front.sidewalk_2",
            value: "lp_school_front.sidewalk_2",
            meta: "Position",
        },{
        caption: "lp_school_front.sidewalk_3",
            value: "lp_school_front.sidewalk_3",
            meta: "Position",
        },{
        caption: "lp_school_front.waiting_area_1",
            value: "lp_school_front.waiting_area_1",
            meta: "Position",
        },{
        caption: "lp_school_front.waiting_area_2",
            value: "lp_school_front.waiting_area_2",
            meta: "Position",
        },{
        caption: "lp_school_front.to_town",
            value: "lp_school_front.to_town",
            meta: "Position",
        },{
        caption: "lp_school_front.school",
            value: "lp_school_front.school",
            meta: "Position",
        },{
        caption: "lp_school_front.door",
            value: "lp_school_front.door",
            meta: "Position",
        },{
        caption: "lp_school_front.stairs_4",
            value: "lp_school_front.stairs_4",
            meta: "Position",
        },{
        caption: "lp_school_front.absent",
            value: "lp_school_front.absent",
            meta: "Position",
        },{
        caption: "lp_school_front.none",
            value: "lp_school_front.none",
            meta: "Position",
        },{
        caption: "lp_school_hallway.entrance",
            value: "lp_school_hallway.entrance",
            meta: "Position",
        },{
        caption: "lp_school_hallway.classroom",
            value: "lp_school_hallway.classroom",
            meta: "Position",
        },{
        caption: "lp_school_hallway.playground_door",
            value: "lp_school_hallway.playground_door",
            meta: "Position",
        },{
        caption: "lp_school_hallway.bulletin_1",
            value: "lp_school_hallway.bulletin_1",
            meta: "Position",
        },{
        caption: "lp_school_hallway.bulletin_2",
            value: "lp_school_hallway.bulletin_2",
            meta: "Position",
        },{
        caption: "lp_school_hallway.bulletin_3",
            value: "lp_school_hallway.bulletin_3",
            meta: "Position",
        },{
        caption: "lp_school_hallway.bulletin_4",
            value: "lp_school_hallway.bulletin_4",
            meta: "Position",
        },{
        caption: "lp_school_hallway.absent",
            value: "lp_school_hallway.absent",
            meta: "Position",
        },{
        caption: "lp_school_hallway.none",
            value: "lp_school_hallway.none",
            meta: "Position",
        },{
        caption: "lp_school_hallway.classroom_1",
            value: "lp_school_hallway.classroom_1",
            meta: "Position",
        },{
        caption: "lp_school_hallway.classroom_2",
            value: "lp_school_hallway.classroom_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.clovis_window",
            value: "lp_school_outside.clovis_window",
            meta: "Position",
        },{
        caption: "lp_school_outside.cool_kid_wall",
            value: "lp_school_outside.cool_kid_wall",
            meta: "Position",
        },{
        caption: "lp_school_outside.main_window_1",
            value: "lp_school_outside.main_window_1",
            meta: "Position",
        },{
        caption: "lp_school_outside.main_window_2",
            value: "lp_school_outside.main_window_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.door_1",
            value: "lp_school_outside.door_1",
            meta: "Position",
        },{
        caption: "lp_school_outside.door_2",
            value: "lp_school_outside.door_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.door_center",
            value: "lp_school_outside.door_center",
            meta: "Position",
        },{
        caption: "lp_school_outside.school_inside",
            value: "lp_school_outside.school_inside",
            meta: "Position",
        },{
        caption: "lp_school_outside.entrance_1",
            value: "lp_school_outside.entrance_1",
            meta: "Position",
        },{
        caption: "lp_school_outside.entrance_2",
            value: "lp_school_outside.entrance_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.entrance_3",
            value: "lp_school_outside.entrance_3",
            meta: "Position",
        },{
        caption: "lp_school_outside.entrance_4",
            value: "lp_school_outside.entrance_4",
            meta: "Position",
        },{
        caption: "lp_school_outside.entrance_5",
            value: "lp_school_outside.entrance_5",
            meta: "Position",
        },{
        caption: "lp_school_outside.entrance_6",
            value: "lp_school_outside.entrance_6",
            meta: "Position",
        },{
        caption: "lp_school_outside.flagpole_1",
            value: "lp_school_outside.flagpole_1",
            meta: "Position",
        },{
        caption: "lp_school_outside.flagpole_2",
            value: "lp_school_outside.flagpole_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.far_corner",
            value: "lp_school_outside.far_corner",
            meta: "Position",
        },{
        caption: "lp_school_outside.stairs_1",
            value: "lp_school_outside.stairs_1",
            meta: "Position",
        },{
        caption: "lp_school_outside.stairs_2",
            value: "lp_school_outside.stairs_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.stairs_3",
            value: "lp_school_outside.stairs_3",
            meta: "Position",
        },{
        caption: "lp_school_outside.sidewalk_1",
            value: "lp_school_outside.sidewalk_1",
            meta: "Position",
        },{
        caption: "lp_school_outside.sidewalk_2",
            value: "lp_school_outside.sidewalk_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.sidewalk_3",
            value: "lp_school_outside.sidewalk_3",
            meta: "Position",
        },{
        caption: "lp_school_outside.waiting_area_1",
            value: "lp_school_outside.waiting_area_1",
            meta: "Position",
        },{
        caption: "lp_school_outside.waiting_area_2",
            value: "lp_school_outside.waiting_area_2",
            meta: "Position",
        },{
        caption: "lp_school_outside.to_town",
            value: "lp_school_outside.to_town",
            meta: "Position",
        },{
        caption: "lp_school_outside.school",
            value: "lp_school_outside.school",
            meta: "Position",
        },{
        caption: "lp_school_outside.door",
            value: "lp_school_outside.door",
            meta: "Position",
        },{
        caption: "lp_school_outside.stairs_4",
            value: "lp_school_outside.stairs_4",
            meta: "Position",
        },{
        caption: "lp_school_outside.absent",
            value: "lp_school_outside.absent",
            meta: "Position",
        },{
        caption: "lp_school_outside.none",
            value: "lp_school_outside.none",
            meta: "Position",
        },





        // Unlocks

        {
        caption: "u_charlie_hallway.lights_on",
            value: "u_charlie_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_hallway.lights_off",
            value: "u_charlie_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_hallway.light_stairway_on",
            value: "u_charlie_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_hallway.light_stairway_off",
            value: "u_charlie_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_hallway.light_ceiling_on",
            value: "u_charlie_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_hallway.light_ceiling_off",
            value: "u_charlie_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.daytime",
            value: "u_charlie_house.daytime",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.fridge_open",
            value: "u_charlie_house.fridge_open",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.fridge_open_slow",
            value: "u_charlie_house.fridge_open_slow",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.fridge_close",
            value: "u_charlie_house.fridge_close",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.fridge_close_fast",
            value: "u_charlie_house.fridge_close_fast",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.tv_on",
            value: "u_charlie_house.tv_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.tv_off",
            value: "u_charlie_house.tv_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.lights_on",
            value: "u_charlie_house.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.lights_off",
            value: "u_charlie_house.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.light_left_on",
            value: "u_charlie_house.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.light_left_off",
            value: "u_charlie_house.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.light_right_on",
            value: "u_charlie_house.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house.light_right_off",
            value: "u_charlie_house.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house_hallway.lights_on",
            value: "u_charlie_house_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house_hallway.lights_off",
            value: "u_charlie_house_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house_hallway.light_stairway_on",
            value: "u_charlie_house_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house_hallway.light_stairway_off",
            value: "u_charlie_house_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house_hallway.light_ceiling_on",
            value: "u_charlie_house_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_house_hallway.light_ceiling_off",
            value: "u_charlie_house_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_room.lights_on",
            value: "u_charlie_room.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_room.lights_off",
            value: "u_charlie_room.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_room.lamp_on",
            value: "u_charlie_room.lamp_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_room.lamp_off",
            value: "u_charlie_room.lamp_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_room.ceiling_light_on",
            value: "u_charlie_room.ceiling_light_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlie_room.ceiling_light_off",
            value: "u_charlie_room.ceiling_light_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_hallway.lights_on",
            value: "u_charlies_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_hallway.lights_off",
            value: "u_charlies_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_hallway.light_stairway_on",
            value: "u_charlies_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_hallway.light_stairway_off",
            value: "u_charlies_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_hallway.light_ceiling_on",
            value: "u_charlies_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_hallway.light_ceiling_off",
            value: "u_charlies_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.daytime",
            value: "u_charlies_house.daytime",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.fridge_open",
            value: "u_charlies_house.fridge_open",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.fridge_open_slow",
            value: "u_charlies_house.fridge_open_slow",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.fridge_close",
            value: "u_charlies_house.fridge_close",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.fridge_close_fast",
            value: "u_charlies_house.fridge_close_fast",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.tv_on",
            value: "u_charlies_house.tv_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.tv_off",
            value: "u_charlies_house.tv_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.lights_on",
            value: "u_charlies_house.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.lights_off",
            value: "u_charlies_house.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.light_left_on",
            value: "u_charlies_house.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.light_left_off",
            value: "u_charlies_house.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.light_right_on",
            value: "u_charlies_house.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house.light_right_off",
            value: "u_charlies_house.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house_hallway.lights_on",
            value: "u_charlies_house_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house_hallway.lights_off",
            value: "u_charlies_house_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house_hallway.light_stairway_on",
            value: "u_charlies_house_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house_hallway.light_stairway_off",
            value: "u_charlies_house_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house_hallway.light_ceiling_on",
            value: "u_charlies_house_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_house_hallway.light_ceiling_off",
            value: "u_charlies_house_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_room.lights_on",
            value: "u_charlies_room.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_room.lights_off",
            value: "u_charlies_room.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_room.lamp_on",
            value: "u_charlies_room.lamp_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_room.lamp_off",
            value: "u_charlies_room.lamp_off",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_room.ceiling_light_on",
            value: "u_charlies_room.ceiling_light_on",
            meta: "Unlock Action",
        },{
        caption: "u_charlies_room.ceiling_light_off",
            value: "u_charlies_room.ceiling_light_off",
            meta: "Unlock Action",
        },{
        caption: "u_classroom.lights_on",
            value: "u_classroom.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_classroom.lights_off",
            value: "u_classroom.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_house_hallway.lights_on",
            value: "u_house_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_house_hallway.lights_off",
            value: "u_house_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_house_hallway.light_stairway_on",
            value: "u_house_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u_house_hallway.light_stairway_off",
            value: "u_house_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u_house_hallway.light_ceiling_on",
            value: "u_house_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u_house_hallway.light_ceiling_off",
            value: "u_house_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.daytime",
            value: "u_living_room.daytime",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.fridge_open",
            value: "u_living_room.fridge_open",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.fridge_open_slow",
            value: "u_living_room.fridge_open_slow",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.fridge_close",
            value: "u_living_room.fridge_close",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.fridge_close_fast",
            value: "u_living_room.fridge_close_fast",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.tv_on",
            value: "u_living_room.tv_on",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.tv_off",
            value: "u_living_room.tv_off",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.lights_on",
            value: "u_living_room.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.lights_off",
            value: "u_living_room.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.light_left_on",
            value: "u_living_room.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.light_left_off",
            value: "u_living_room.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.light_right_on",
            value: "u_living_room.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u_living_room.light_right_off",
            value: "u_living_room.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u_school_hallway.lights_on",
            value: "u_school_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u_school_hallway.lights_off",
            value: "u_school_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u_school_hallway.light_left_on",
            value: "u_school_hallway.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u_school_hallway.light_left_off",
            value: "u_school_hallway.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u_school_hallway.light_right_on",
            value: "u_school_hallway.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u_school_hallway.light_right_off",
            value: "u_school_hallway.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_off",
            value: "u_riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_on",
            value: "u_riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_off",
            value: "u_riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_on",
            value: "u_riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_off",
            value: "u_riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_on",
            value: "u_riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_off",
            value: "u_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_on",
            value: "u_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_off",
            value: "u_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_on",
            value: "u_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_off",
            value: "u_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_on",
            value: "u_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_combat_tips_show",
            value: "u_combat_tips_show",
            meta: "Unlock Action",
        },{
        caption: "u_combat_tips_hide",
            value: "u_combat_tips_hide",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_off",
            value: "u_riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_on",
            value: "u_riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_off",
            value: "u_riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_on",
            value: "u_riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_off",
            value: "u_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_on",
            value: "u_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_off",
            value: "u_riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_on",
            value: "u_riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_off",
            value: "u_riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_on",
            value: "u_riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_off",
            value: "u_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_on",
            value: "u_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_off",
            value: "u_riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_on",
            value: "u_riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_off",
            value: "u_riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_on",
            value: "u_riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_off",
            value: "u_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_on",
            value: "u_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_hide_chained_riley",
            value: "u_hide_chained_riley",
            meta: "Unlock Action",
        },{
        caption: "u_ch2_door_basement",
            value: "u_ch2_door_basement",
            meta: "Unlock Action",
        },{
        caption: "u_final_slide",
            value: "u_final_slide",
            meta: "Unlock Action",
        },{
        caption: "u_add_star ",
            value: "u_add_star ",
            meta: "Unlock Action",
        },{
        caption: "u_remove_star ",
            value: "u_remove_star ",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_on",
            value: "u_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_off",
            value: "u_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_on",
            value: "u_riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_off",
            value: "u_riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_on",
            value: "u_riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_off",
            value: "u_riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_on",
            value: "u_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_off",
            value: "u_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_on",
            value: "u_riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_off",
            value: "u_riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_on",
            value: "u_riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_off",
            value: "u_riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_on",
            value: "u_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_off",
            value: "u_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_on",
            value: "u_riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_off",
            value: "u_riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_on",
            value: "u_riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_off",
            value: "u_riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_on",
            value: "u_riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_off",
            value: "u_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_on",
            value: "u_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_on",
            value: "u_riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_on",
            value: "u_riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_off",
            value: "u_riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_off",
            value: "u_riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_off",
            value: "u_riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_off",
            value: "u_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_skills_guide_off",
            value: "u_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_off",
            value: "u_riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_combat_block_run",
            value: "u_combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_off",
            value: "u_riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_off",
            value: "u_riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u_riley_move_guide_on",
            value: "u_riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_run_guide_on",
            value: "u_riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_skills_guide_on",
            value: "u_riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_move_guide_on",
            value: "u_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_run_guide_on",
            value: "u_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u_riley_chained_flipx",
            value: "u_riley_chained_flipx",
            meta: "Unlock Action",
        },{
        caption: "u_combat_tips_hide",
            value: "u_combat_tips_hide",
            meta: "Unlock Action",
        },{
        caption: "u_combat_tips_show",
            value: "u_combat_tips_show",
            meta: "Unlock Action",
        },















        // EMOTES
        {
        caption: "e_action_success",
            value: "e_action_success",
            meta: "Emote",
        },{
        caption: "e_adult_squat",
            value: "e_adult_squat",
            meta: "Emote",
        },{
        caption: "e_blocked",
            value: "e_blocked",
            meta: "Emote",
        },{
        caption: "e_blow_whistle",
            value: "e_blow_whistle",
            meta: "Emote",
        },{
        caption: "e_crawl",
            value: "e_crawl",
            meta: "Emote",
        },{
        caption: "e_damaged",
            value: "e_damaged",
            meta: "Emote",
        },{
        caption: "e_EnterBed",
            value: "e_EnterBed",
            meta: "Emote",
        },{
        caption: "e_ExitBed",
            value: "e_ExitBed",
            meta: "Emote",
        },{
        caption: "e_ExitBedImmediate",
            value: "e_ExitBedImmediate",
            meta: "Emote",
        },{
        caption: "e_hand_chops",
            value: "e_hand_chops",
            meta: "Emote",
        },{
        caption: "e_hand_curl",
            value: "e_hand_curl",
            meta: "Emote",
        },{
        caption: "e_hand_curl_left",
            value: "e_hand_curl_left",
            meta: "Emote",
        },{
        caption: "e_hand_curl_right",
            value: "e_hand_curl_right",
            meta: "Emote",
        },{
        caption: "e_hands_on_hips",
            value: "e_hands_on_hips",
            meta: "Emote",
        },{
        caption: "e_hands_raised",
            value: "e_hands_raised",
            meta: "Emote",
        },{
        caption: "e_hanging",
            value: "e_hanging",
            meta: "Emote",
        },{
        caption: "e_head_in_hands",
            value: "e_head_in_hands",
            meta: "Emote",
        },{
        caption: "e_head_nod",
            value: "e_head_nod",
            meta: "Emote",
        },{
        caption: "e_head_shake",
            value: "e_head_shake",
            meta: "Emote",
        },{
        caption: "e_HoldCup",
            value: "e_HoldCup",
            meta: "Emote",
        },{
        caption: "e_HorizontalVelocity",
            value: "e_HorizontalVelocity",
            meta: "Emote",
        },{
        caption: "e_isMovingUp",
            value: "e_isMovingUp",
            meta: "Emote",
        },{
        caption: "e_jump_explode",
            value: "e_jump_explode",
            meta: "Emote",
        },{
        caption: "e_jump_up",
            value: "e_jump_up",
            meta: "Emote",
        },{
        caption: "e_ladder_climb",
            value: "e_ladder_climb",
            meta: "Emote",
        },{
        caption: "e_LayDownImmediate",
            value: "e_LayDownImmediate",
            meta: "Emote",
        },{
        caption: "e_lean_backward",
            value: "e_lean_backward",
            meta: "Emote",
        },{
        caption: "e_lean_forward",
            value: "e_lean_forward",
            meta: "Emote",
        },{
        caption: "e_look_around",
            value: "e_look_around",
            meta: "Emote",
        },{
        caption: "e_move_complete",
            value: "e_move_complete",
            meta: "Emote",
        },{
        caption: "e_punch1",
            value: "e_punch1",
            meta: "Emote",
        },{
        caption: "e_RaiseHand",
            value: "e_RaiseHand",
            meta: "Emote",
        },{
        caption: "e_RaiseHandTrigger",
            value: "e_RaiseHandTrigger",
            meta: "Emote",
        },{
        caption: "e_recorder_complete",
            value: "e_recorder_complete",
            meta: "Emote",
        },{
        caption: "e_reset_state",
            value: "e_reset_state",
            meta: "Emote",
        },{
        caption: "e_Revived",
            value: "e_Revived",
            meta: "Emote",
        },{
        caption: "e_RollTrigger",
            value: "e_RollTrigger",
            meta: "Emote",
        },{
        caption: "e_scratch_head",
            value: "e_scratch_head",
            meta: "Emote",
        },{
        caption: "e_sit_ground",
            value: "e_sit_ground",
            meta: "Emote",
        },{
        caption: "e_Sitting",
            value: "e_Sitting",
            meta: "Emote",
        },{
        caption: "e_sitting_sad",
            value: "e_sitting_sad",
            meta: "Emote",
        },{
        caption: "e_slide_push",
            value: "e_slide_push",
            meta: "Emote",
        },{
        caption: "e_SlideClimbInTrigger",
            value: "e_SlideClimbInTrigger",
            meta: "Emote",
        },{
        caption: "e_SlideClimbOutTrigger",
            value: "e_SlideClimbOutTrigger",
            meta: "Emote",
        },{
        caption: "e_SlideExitTrigger",
            value: "e_SlideExitTrigger",
            meta: "Emote",
        },{
        caption: "e_SlideTrigger",
            value: "e_SlideTrigger",
            meta: "Emote",
        },{
        caption: "e_thinking",
            value: "e_thinking",
            meta: "Emote",
        },{
        caption: "e_throw",
            value: "e_throw",
            meta: "Emote",
        },{
        caption: "e_tired_1",
            value: "e_tired_1",
            meta: "Emote",
        },{
        caption: "e_tired_2",
            value: "e_tired_2",
            meta: "Emote",
        },{
        caption: "e_UnlockedChains",
            value: "e_UnlockedChains",
            meta: "Emote",
        },{
        caption: "e_Velocity",
            value: "e_Velocity",
            meta: "Emote",
        },{
        caption: "e_VerticalVelocity",
            value: "e_VerticalVelocity",
            meta: "Emote",
        },{
        caption: "e_wand_wave",
            value: "e_wand_wave",
            meta: "Emote",
        },{
        caption: "e_Waving",
            value: "e_Waving",
            meta: "Emote",
        },{
        caption: "e_whisper",
            value: "e_whisper",
            meta: "Emote",
        },


        // CHARACTER COMMANDS

    
    );
    
    return suggestions;
}