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



// COMMAND

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
        caption: "camera_zoom ZOOM_VALUE",
            value: "camera_zoom ZOOM_VALUE",
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




// CHARACTER COMMAND

{
        caption: "character c. anim_layer_weight LAYER_NAME WEIGHT",
            value: "character c. anim_layer_weight LAYER_NAME WEIGHT",
            meta: "Character Command",
        },{
        caption: "character c. ai_control",
            value: "character c. ai_control",
            meta: "Character Command",
        },{
        caption: "character c. control",
            value: "character c. control",
            meta: "Character Command",
        },{
        caption: "character c. set_dialog SCENE_NAME",
            value: "character c. set_dialog SCENE_NAME",
            meta: "Character Command",
        },{
        caption: "help character c.  - sets the character's dialog when they are talked to",
            value: "help character c.  - sets the character's dialog when they are talked to",
            meta: "Character Command",
        },{
        caption: "character c. emote_set EMOTE_NAME IS_ACTIVE",
            value: "character c. emote_set EMOTE_NAME IS_ACTIVE",
            meta: "Character Command",
        },{
        caption: "character c. emote e_",
            value: "character c. emote e_",
            meta: "Character Command",
        },{
        caption: "character c. interact exit",
            value: "character c. interact exit",
            meta: "Character Command",
        },{
        caption: "character c. interact_immediate LOCATION_NAME",
            value: "character c. interact_immediate LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character c. interact TARGET_NAME",
            value: "character c. interact TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character c. follow TARGET_NAME",
            value: "character c. follow TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character c. stop follow",
            value: "character c. stop follow",
            meta: "Character Command",
        },{
        caption: "character c. hold ITEM_NAME",
            value: "character c. hold ITEM_NAME",
            meta: "Character Command",
        },{
        caption: "character c. place ITEM_NAME POSITION",
            value: "character c. place ITEM_NAME POSITION",
            meta: "Character Command",
        },{
        caption: "character c. hide",
            value: "character c. hide",
            meta: "Character Command",
        },{
        caption: "character c. show",
            value: "character c. show",
            meta: "Character Command",
        },{
        caption: "character c. set_layer LAYER_NUM",
            value: "character c. set_layer LAYER_NUM",
            meta: "Character Command",
        },{
        caption: "character c. look LOCATION_NAME",
            value: "character c. look LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character c. ondestination",
            value: "character c. ondestination",
            meta: "Character Command",
        },{
        caption: "character c. point right TARGET_NAME",
            value: "character c. point right TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character c. point_left TARGET_NAME",
            value: "character c. point_left TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character c. position LOCATION_NAME",
            value: "character c. position LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character c. position_offset OFFSET_X OFFSET_Y",
            value: "character c. position_offset OFFSET_X OFFSET_Y",
            meta: "Character Command",
        },{
        caption: "character c. position_relative_offset TARGET_POSITION_NAME OFFSET_X OFFSET_Y",
            value: "character c. position_relative_offset TARGET_POSITION_NAME OFFSET_X OFFSET_Y",
            meta: "Character Command",
        },{
        caption: "character c. reset",
            value: "character c. reset",
            meta: "Character Command",
        },{
        caption: "character c. run_speed SPEED",
            value: "character c. run_speed SPEED",
            meta: "Character Command",
        },{
        caption: "character c. run_to LOCATION_NAME",
            value: "character c. run_to LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character c. stop",
            value: "character c. stop",
            meta: "Character Command",
        },{
        caption: "character c. turn around",
            value: "character c. turn around",
            meta: "Character Command",
        },{
        caption: "character c. turn LOCATION_NAME",
            value: "character c. turn LOCATION_NAME",
            meta: "Character Command",
        },{
        caption: "character c. throw ITEM_NAME TARGET on destination ON_DESTINATION",
            value: "character c. throw ITEM_NAME TARGET on destination ON_DESTINATION",
            meta: "Character Command",
        },{
        caption: "character c. blink",
            value: "character c. blink",
            meta: "Character Command",
        },{
        caption: "character c. blink_rapid",
            value: "character c. blink_rapid",
            meta: "Character Command",
        },{
        caption: "character c. set_outfit OUTFIT_NAME",
            value: "character c. set_outfit OUTFIT_NAME",
            meta: "Character Command",
        },{
        caption: "character c. close_eyes",
            value: "character c. close_eyes",
            meta: "Character Command",
        },{
        caption: "character c. set_sprite BODY_PART_NAME SPRITE_NAME",
            value: "character c. set_sprite BODY_PART_NAME SPRITE_NAME",
            meta: "Character Command",
        },{
        caption: "character c. open_eyes",
            value: "character c. open_eyes",
            meta: "Character Command",
        },{
        caption: "character c. quick_point_left TARGET_NAME",
            value: "character c. quick_point_left TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character c. quick_point_right TARGET_NAME",
            value: "character c. quick_point_right TARGET_NAME",
            meta: "Character Command",
        },{
        caption: "character c. walk_speed SPEED",
            value: "character c. walk_speed SPEED",
            meta: "Character Command",
        },{
        caption: "character c. walk_to LOCATION_NAME",
            value: "character c. walk_to LOCATION_NAME",
            meta: "Character Command",
        },




// CHARACTER

{
        caption: "c.alex",
            value: "c.alex",
            meta: "Character",
        },{
        caption: "c.alex_dream",
            value: "c.alex_dream",
            meta: "Character",
        },{
        caption: "c.bria",
            value: "c.bria",
            meta: "Character",
        },{
        caption: "c.brownie",
            value: "c.brownie",
            meta: "Character",
        },{
        caption: "c.bunman",
            value: "c.bunman",
            meta: "Character",
        },{
        caption: "c.charlie",
            value: "c.charlie",
            meta: "Character",
        },{
        caption: "c.charlie_dream",
            value: "c.charlie_dream",
            meta: "Character",
        },{
        caption: "c.clovis",
            value: "c.clovis",
            meta: "Character",
        },{
        caption: "c.connor",
            value: "c.connor",
            meta: "Character",
        },{
        caption: "c.dad",
            value: "c.dad",
            meta: "Character",
        },{
        caption: "c.dustin",
            value: "c.dustin",
            meta: "Character",
        },{
        caption: "c.eliana",
            value: "c.eliana",
            meta: "Character",
        },{
        caption: "c.erika",
            value: "c.erika",
            meta: "Character",
        },{
        caption: "c.jason",
            value: "c.jason",
            meta: "Character",
        },{
        caption: "c.juliette",
            value: "c.juliette",
            meta: "Character",
        },{
        caption: "c.kaden",
            value: "c.kaden",
            meta: "Character",
        },{
        caption: "c.klarissa",
            value: "c.klarissa",
            meta: "Character",
        },{
        caption: "c.lee",
            value: "c.lee",
            meta: "Character",
        },{
        caption: "c.logan",
            value: "c.logan",
            meta: "Character",
        },{
        caption: "c.mason",
            value: "c.mason",
            meta: "Character",
        },{
        caption: "c.mom",
            value: "c.mom",
            meta: "Character",
        },{
        caption: "c.nicole",
            value: "c.nicole",
            meta: "Character",
        },{
        caption: "c.riley",
            value: "c.riley",
            meta: "Character",
        },{
        caption: "c.riley_dream",
            value: "c.riley_dream",
            meta: "Character",
        },{
        caption: "c.sammy",
            value: "c.sammy",
            meta: "Character",
        },{
        caption: "c.sky",
            value: "c.sky",
            meta: "Character",
        },




// LOCATION

{
        caption: "l.charlie_hallway",
            value: "l.charlie_hallway",
            meta: "Location",
        },{
        caption: "l.charlie_house",
            value: "l.charlie_house",
            meta: "Location",
        },{
        caption: "l.charlie_house_hallway",
            value: "l.charlie_house_hallway",
            meta: "Location",
        },{
        caption: "l.charlie_room",
            value: "l.charlie_room",
            meta: "Location",
        },{
        caption: "l.charlies_hallway",
            value: "l.charlies_hallway",
            meta: "Location",
        },{
        caption: "l.charlies_house",
            value: "l.charlies_house",
            meta: "Location",
        },{
        caption: "l.charlies_house_hallway",
            value: "l.charlies_house_hallway",
            meta: "Location",
        },{
        caption: "l.charlies_room",
            value: "l.charlies_room",
            meta: "Location",
        },{
        caption: "l.classroom",
            value: "l.classroom",
            meta: "Location",
        },{
        caption: "l.house_hallway",
            value: "l.house_hallway",
            meta: "Location",
        },{
        caption: "l.living_room",
            value: "l.living_room",
            meta: "Location",
        },{
        caption: "l.outside_school",
            value: "l.outside_school",
            meta: "Location",
        },{
        caption: "l.playground",
            value: "l.playground",
            meta: "Location",
        },{
        caption: "l.school_ext",
            value: "l.school_ext",
            meta: "Location",
        },{
        caption: "l.school_front",
            value: "l.school_front",
            meta: "Location",
        },{
        caption: "l.school_hallway",
            value: "l.school_hallway",
            meta: "Location",
        },{
        caption: "l.school_outside",
            value: "l.school_outside",
            meta: "Location",
        },




// LOCATION POSITION

{
        caption: "lp.charlie_hallway.stairs",
            value: "lp.charlie_hallway.stairs",
            meta: "Location Position",
        },{
        caption: "lp.charlie_hallway.charlies_door",
            value: "lp.charlie_hallway.charlies_door",
            meta: "Location Position",
        },{
        caption: "lp.charlie_hallway.none",
            value: "lp.charlie_hallway.none",
            meta: "Location Position",
        },{
        caption: "lp.charlie_hallway.absent",
            value: "lp.charlie_hallway.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.stairs_top",
            value: "lp.charlie_house.stairs_top",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.door",
            value: "lp.charlie_house.door",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.entry",
            value: "lp.charlie_house.entry",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.window",
            value: "lp.charlie_house.window",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.stairs_middle",
            value: "lp.charlie_house.stairs_middle",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.stairs_bottom",
            value: "lp.charlie_house.stairs_bottom",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.lr_1",
            value: "lp.charlie_house.lr_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.lr_2",
            value: "lp.charlie_house.lr_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.lr_3",
            value: "lp.charlie_house.lr_3",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.lr_4",
            value: "lp.charlie_house.lr_4",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.lr_5",
            value: "lp.charlie_house.lr_5",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.lr_6",
            value: "lp.charlie_house.lr_6",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.lr_7",
            value: "lp.charlie_house.lr_7",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.rug_1",
            value: "lp.charlie_house.rug_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.rug_2",
            value: "lp.charlie_house.rug_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.rug_3",
            value: "lp.charlie_house.rug_3",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.rug_4",
            value: "lp.charlie_house.rug_4",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.rug_5",
            value: "lp.charlie_house.rug_5",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.rug_6",
            value: "lp.charlie_house.rug_6",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.rug_7",
            value: "lp.charlie_house.rug_7",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.kitchen_1",
            value: "lp.charlie_house.kitchen_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.kitchen_2",
            value: "lp.charlie_house.kitchen_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.kitchen_3",
            value: "lp.charlie_house.kitchen_3",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.kitchen_4",
            value: "lp.charlie_house.kitchen_4",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.kitchen_5",
            value: "lp.charlie_house.kitchen_5",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.dishwasher",
            value: "lp.charlie_house.dishwasher",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.sink",
            value: "lp.charlie_house.sink",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.oven",
            value: "lp.charlie_house.oven",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.fridge_1",
            value: "lp.charlie_house.fridge_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.fridge_2",
            value: "lp.charlie_house.fridge_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.table",
            value: "lp.charlie_house.table",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.chair_1",
            value: "lp.charlie_house.chair_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.chair_2",
            value: "lp.charlie_house.chair_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.chair_3",
            value: "lp.charlie_house.chair_3",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.chair_4",
            value: "lp.charlie_house.chair_4",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.couch_1",
            value: "lp.charlie_house.couch_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.couch_2",
            value: "lp.charlie_house.couch_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.couch_3",
            value: "lp.charlie_house.couch_3",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.couch_4",
            value: "lp.charlie_house.couch_4",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.cozy_chair",
            value: "lp.charlie_house.cozy_chair",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.void",
            value: "lp.charlie_house.void",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.absent",
            value: "lp.charlie_house.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.none",
            value: "lp.charlie_house.none",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house.window_2",
            value: "lp.charlie_house.window_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house_hallway.stairs",
            value: "lp.charlie_house_hallway.stairs",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house_hallway.charlies_door",
            value: "lp.charlie_house_hallway.charlies_door",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house_hallway.none",
            value: "lp.charlie_house_hallway.none",
            meta: "Location Position",
        },{
        caption: "lp.charlie_house_hallway.absent",
            value: "lp.charlie_house_hallway.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.absent",
            value: "lp.charlie_room.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.none",
            value: "lp.charlie_room.none",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.middle",
            value: "lp.charlie_room.middle",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.outside",
            value: "lp.charlie_room.outside",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.door",
            value: "lp.charlie_room.door",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.hallway",
            value: "lp.charlie_room.hallway",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.shelf",
            value: "lp.charlie_room.shelf",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.toybox",
            value: "lp.charlie_room.toybox",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.sidetable",
            value: "lp.charlie_room.sidetable",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.bedside",
            value: "lp.charlie_room.bedside",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.bed",
            value: "lp.charlie_room.bed",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.center_1",
            value: "lp.charlie_room.center_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.center_2",
            value: "lp.charlie_room.center_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.center_3",
            value: "lp.charlie_room.center_3",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.desk",
            value: "lp.charlie_room.desk",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.trash",
            value: "lp.charlie_room.trash",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.window_1",
            value: "lp.charlie_room.window_1",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.window_2",
            value: "lp.charlie_room.window_2",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.hamper",
            value: "lp.charlie_room.hamper",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.sleep_bed",
            value: "lp.charlie_room.sleep_bed",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.dream_bed",
            value: "lp.charlie_room.dream_bed",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.sidetable_cup_position",
            value: "lp.charlie_room.sidetable_cup_position",
            meta: "Location Position",
        },{
        caption: "lp.charlie_room.lightswitch",
            value: "lp.charlie_room.lightswitch",
            meta: "Location Position",
        },{
        caption: "lp.charlies_hallway.stairs",
            value: "lp.charlies_hallway.stairs",
            meta: "Location Position",
        },{
        caption: "lp.charlies_hallway.charlies_door",
            value: "lp.charlies_hallway.charlies_door",
            meta: "Location Position",
        },{
        caption: "lp.charlies_hallway.none",
            value: "lp.charlies_hallway.none",
            meta: "Location Position",
        },{
        caption: "lp.charlies_hallway.absent",
            value: "lp.charlies_hallway.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.stairs_top",
            value: "lp.charlies_house.stairs_top",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.door",
            value: "lp.charlies_house.door",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.entry",
            value: "lp.charlies_house.entry",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.window",
            value: "lp.charlies_house.window",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.stairs_middle",
            value: "lp.charlies_house.stairs_middle",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.stairs_bottom",
            value: "lp.charlies_house.stairs_bottom",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.lr_1",
            value: "lp.charlies_house.lr_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.lr_2",
            value: "lp.charlies_house.lr_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.lr_3",
            value: "lp.charlies_house.lr_3",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.lr_4",
            value: "lp.charlies_house.lr_4",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.lr_5",
            value: "lp.charlies_house.lr_5",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.lr_6",
            value: "lp.charlies_house.lr_6",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.lr_7",
            value: "lp.charlies_house.lr_7",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.rug_1",
            value: "lp.charlies_house.rug_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.rug_2",
            value: "lp.charlies_house.rug_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.rug_3",
            value: "lp.charlies_house.rug_3",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.rug_4",
            value: "lp.charlies_house.rug_4",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.rug_5",
            value: "lp.charlies_house.rug_5",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.rug_6",
            value: "lp.charlies_house.rug_6",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.rug_7",
            value: "lp.charlies_house.rug_7",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.kitchen_1",
            value: "lp.charlies_house.kitchen_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.kitchen_2",
            value: "lp.charlies_house.kitchen_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.kitchen_3",
            value: "lp.charlies_house.kitchen_3",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.kitchen_4",
            value: "lp.charlies_house.kitchen_4",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.kitchen_5",
            value: "lp.charlies_house.kitchen_5",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.dishwasher",
            value: "lp.charlies_house.dishwasher",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.sink",
            value: "lp.charlies_house.sink",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.oven",
            value: "lp.charlies_house.oven",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.fridge_1",
            value: "lp.charlies_house.fridge_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.fridge_2",
            value: "lp.charlies_house.fridge_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.table",
            value: "lp.charlies_house.table",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.chair_1",
            value: "lp.charlies_house.chair_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.chair_2",
            value: "lp.charlies_house.chair_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.chair_3",
            value: "lp.charlies_house.chair_3",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.chair_4",
            value: "lp.charlies_house.chair_4",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.couch_1",
            value: "lp.charlies_house.couch_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.couch_2",
            value: "lp.charlies_house.couch_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.couch_3",
            value: "lp.charlies_house.couch_3",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.couch_4",
            value: "lp.charlies_house.couch_4",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.cozy_chair",
            value: "lp.charlies_house.cozy_chair",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.void",
            value: "lp.charlies_house.void",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.absent",
            value: "lp.charlies_house.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.none",
            value: "lp.charlies_house.none",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house.window_2",
            value: "lp.charlies_house.window_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house_hallway.stairs",
            value: "lp.charlies_house_hallway.stairs",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house_hallway.charlies_door",
            value: "lp.charlies_house_hallway.charlies_door",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house_hallway.none",
            value: "lp.charlies_house_hallway.none",
            meta: "Location Position",
        },{
        caption: "lp.charlies_house_hallway.absent",
            value: "lp.charlies_house_hallway.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.absent",
            value: "lp.charlies_room.absent",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.none",
            value: "lp.charlies_room.none",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.middle",
            value: "lp.charlies_room.middle",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.outside",
            value: "lp.charlies_room.outside",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.door",
            value: "lp.charlies_room.door",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.hallway",
            value: "lp.charlies_room.hallway",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.shelf",
            value: "lp.charlies_room.shelf",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.toybox",
            value: "lp.charlies_room.toybox",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.sidetable",
            value: "lp.charlies_room.sidetable",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.bedside",
            value: "lp.charlies_room.bedside",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.bed",
            value: "lp.charlies_room.bed",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.center_1",
            value: "lp.charlies_room.center_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.center_2",
            value: "lp.charlies_room.center_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.center_3",
            value: "lp.charlies_room.center_3",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.desk",
            value: "lp.charlies_room.desk",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.trash",
            value: "lp.charlies_room.trash",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.window_1",
            value: "lp.charlies_room.window_1",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.window_2",
            value: "lp.charlies_room.window_2",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.hamper",
            value: "lp.charlies_room.hamper",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.sleep_bed",
            value: "lp.charlies_room.sleep_bed",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.dream_bed",
            value: "lp.charlies_room.dream_bed",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.sidetable_cup_position",
            value: "lp.charlies_room.sidetable_cup_position",
            meta: "Location Position",
        },{
        caption: "lp.charlies_room.lightswitch",
            value: "lp.charlies_room.lightswitch",
            meta: "Location Position",
        },{
        caption: "lp.classroom.front1",
            value: "lp.classroom.front1",
            meta: "Location Position",
        },{
        caption: "lp.classroom.back",
            value: "lp.classroom.back",
            meta: "Location Position",
        },{
        caption: "lp.classroom.kaden_desk",
            value: "lp.classroom.kaden_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.bria_desk",
            value: "lp.classroom.bria_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.mason_desk",
            value: "lp.classroom.mason_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.jason_desk",
            value: "lp.classroom.jason_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.dustin_desk",
            value: "lp.classroom.dustin_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.eliana_desk",
            value: "lp.classroom.eliana_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.logan_desk",
            value: "lp.classroom.logan_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.charlie_desk",
            value: "lp.classroom.charlie_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.sky_desk",
            value: "lp.classroom.sky_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.brownie_desk",
            value: "lp.classroom.brownie_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.juliette_desk",
            value: "lp.classroom.juliette_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.nicole_desk",
            value: "lp.classroom.nicole_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.riley_desk",
            value: "lp.classroom.riley_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.erika_desk",
            value: "lp.classroom.erika_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.alex_desk",
            value: "lp.classroom.alex_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.connor_desk",
            value: "lp.classroom.connor_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.absent",
            value: "lp.classroom.absent",
            meta: "Location Position",
        },{
        caption: "lp.classroom.none",
            value: "lp.classroom.none",
            meta: "Location Position",
        },{
        caption: "lp.classroom.middle",
            value: "lp.classroom.middle",
            meta: "Location Position",
        },{
        caption: "lp.classroom.outside",
            value: "lp.classroom.outside",
            meta: "Location Position",
        },{
        caption: "lp.classroom.door",
            value: "lp.classroom.door",
            meta: "Location Position",
        },{
        caption: "lp.classroom.front2",
            value: "lp.classroom.front2",
            meta: "Location Position",
        },{
        caption: "lp.classroom.front3",
            value: "lp.classroom.front3",
            meta: "Location Position",
        },{
        caption: "lp.classroom.front4",
            value: "lp.classroom.front4",
            meta: "Location Position",
        },{
        caption: "lp.classroom.teacher_desk",
            value: "lp.classroom.teacher_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.whiteboard_1",
            value: "lp.classroom.whiteboard_1",
            meta: "Location Position",
        },{
        caption: "lp.classroom.whiteboard_2",
            value: "lp.classroom.whiteboard_2",
            meta: "Location Position",
        },{
        caption: "lp.classroom.question_desk",
            value: "lp.classroom.question_desk",
            meta: "Location Position",
        },{
        caption: "lp.classroom.window_1",
            value: "lp.classroom.window_1",
            meta: "Location Position",
        },{
        caption: "lp.classroom.window_2",
            value: "lp.classroom.window_2",
            meta: "Location Position",
        },{
        caption: "lp.classroom.window_3",
            value: "lp.classroom.window_3",
            meta: "Location Position",
        },{
        caption: "lp.classroom.window_4",
            value: "lp.classroom.window_4",
            meta: "Location Position",
        },{
        caption: "lp.classroom.cubby_1",
            value: "lp.classroom.cubby_1",
            meta: "Location Position",
        },{
        caption: "lp.classroom.cubby_2",
            value: "lp.classroom.cubby_2",
            meta: "Location Position",
        },{
        caption: "lp.classroom.teacher_corner",
            value: "lp.classroom.teacher_corner",
            meta: "Location Position",
        },{
        caption: "lp.classroom.drawing_cursor",
            value: "lp.classroom.drawing_cursor",
            meta: "Location Position",
        },{
        caption: "lp.house_hallway.stairs",
            value: "lp.house_hallway.stairs",
            meta: "Location Position",
        },{
        caption: "lp.house_hallway.charlies_door",
            value: "lp.house_hallway.charlies_door",
            meta: "Location Position",
        },{
        caption: "lp.house_hallway.none",
            value: "lp.house_hallway.none",
            meta: "Location Position",
        },{
        caption: "lp.house_hallway.absent",
            value: "lp.house_hallway.absent",
            meta: "Location Position",
        },{
        caption: "lp.living_room.stairs_top",
            value: "lp.living_room.stairs_top",
            meta: "Location Position",
        },{
        caption: "lp.living_room.door",
            value: "lp.living_room.door",
            meta: "Location Position",
        },{
        caption: "lp.living_room.entry",
            value: "lp.living_room.entry",
            meta: "Location Position",
        },{
        caption: "lp.living_room.window",
            value: "lp.living_room.window",
            meta: "Location Position",
        },{
        caption: "lp.living_room.stairs_middle",
            value: "lp.living_room.stairs_middle",
            meta: "Location Position",
        },{
        caption: "lp.living_room.stairs_bottom",
            value: "lp.living_room.stairs_bottom",
            meta: "Location Position",
        },{
        caption: "lp.living_room.lr_1",
            value: "lp.living_room.lr_1",
            meta: "Location Position",
        },{
        caption: "lp.living_room.lr_2",
            value: "lp.living_room.lr_2",
            meta: "Location Position",
        },{
        caption: "lp.living_room.lr_3",
            value: "lp.living_room.lr_3",
            meta: "Location Position",
        },{
        caption: "lp.living_room.lr_4",
            value: "lp.living_room.lr_4",
            meta: "Location Position",
        },{
        caption: "lp.living_room.lr_5",
            value: "lp.living_room.lr_5",
            meta: "Location Position",
        },{
        caption: "lp.living_room.lr_6",
            value: "lp.living_room.lr_6",
            meta: "Location Position",
        },{
        caption: "lp.living_room.lr_7",
            value: "lp.living_room.lr_7",
            meta: "Location Position",
        },{
        caption: "lp.living_room.rug_1",
            value: "lp.living_room.rug_1",
            meta: "Location Position",
        },{
        caption: "lp.living_room.rug_2",
            value: "lp.living_room.rug_2",
            meta: "Location Position",
        },{
        caption: "lp.living_room.rug_3",
            value: "lp.living_room.rug_3",
            meta: "Location Position",
        },{
        caption: "lp.living_room.rug_4",
            value: "lp.living_room.rug_4",
            meta: "Location Position",
        },{
        caption: "lp.living_room.rug_5",
            value: "lp.living_room.rug_5",
            meta: "Location Position",
        },{
        caption: "lp.living_room.rug_6",
            value: "lp.living_room.rug_6",
            meta: "Location Position",
        },{
        caption: "lp.living_room.rug_7",
            value: "lp.living_room.rug_7",
            meta: "Location Position",
        },{
        caption: "lp.living_room.kitchen_1",
            value: "lp.living_room.kitchen_1",
            meta: "Location Position",
        },{
        caption: "lp.living_room.kitchen_2",
            value: "lp.living_room.kitchen_2",
            meta: "Location Position",
        },{
        caption: "lp.living_room.kitchen_3",
            value: "lp.living_room.kitchen_3",
            meta: "Location Position",
        },{
        caption: "lp.living_room.kitchen_4",
            value: "lp.living_room.kitchen_4",
            meta: "Location Position",
        },{
        caption: "lp.living_room.kitchen_5",
            value: "lp.living_room.kitchen_5",
            meta: "Location Position",
        },{
        caption: "lp.living_room.dishwasher",
            value: "lp.living_room.dishwasher",
            meta: "Location Position",
        },{
        caption: "lp.living_room.sink",
            value: "lp.living_room.sink",
            meta: "Location Position",
        },{
        caption: "lp.living_room.oven",
            value: "lp.living_room.oven",
            meta: "Location Position",
        },{
        caption: "lp.living_room.fridge_1",
            value: "lp.living_room.fridge_1",
            meta: "Location Position",
        },{
        caption: "lp.living_room.fridge_2",
            value: "lp.living_room.fridge_2",
            meta: "Location Position",
        },{
        caption: "lp.living_room.table",
            value: "lp.living_room.table",
            meta: "Location Position",
        },{
        caption: "lp.living_room.chair_1",
            value: "lp.living_room.chair_1",
            meta: "Location Position",
        },{
        caption: "lp.living_room.chair_2",
            value: "lp.living_room.chair_2",
            meta: "Location Position",
        },{
        caption: "lp.living_room.chair_3",
            value: "lp.living_room.chair_3",
            meta: "Location Position",
        },{
        caption: "lp.living_room.chair_4",
            value: "lp.living_room.chair_4",
            meta: "Location Position",
        },{
        caption: "lp.living_room.couch_1",
            value: "lp.living_room.couch_1",
            meta: "Location Position",
        },{
        caption: "lp.living_room.couch_2",
            value: "lp.living_room.couch_2",
            meta: "Location Position",
        },{
        caption: "lp.living_room.couch_3",
            value: "lp.living_room.couch_3",
            meta: "Location Position",
        },{
        caption: "lp.living_room.couch_4",
            value: "lp.living_room.couch_4",
            meta: "Location Position",
        },{
        caption: "lp.living_room.cozy_chair",
            value: "lp.living_room.cozy_chair",
            meta: "Location Position",
        },{
        caption: "lp.living_room.void",
            value: "lp.living_room.void",
            meta: "Location Position",
        },{
        caption: "lp.living_room.absent",
            value: "lp.living_room.absent",
            meta: "Location Position",
        },{
        caption: "lp.living_room.none",
            value: "lp.living_room.none",
            meta: "Location Position",
        },{
        caption: "lp.living_room.window_2",
            value: "lp.living_room.window_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.clovis_window",
            value: "lp.outside_school.clovis_window",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.cool_kid_wall",
            value: "lp.outside_school.cool_kid_wall",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.main_window_1",
            value: "lp.outside_school.main_window_1",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.main_window_2",
            value: "lp.outside_school.main_window_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.door_1",
            value: "lp.outside_school.door_1",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.door_2",
            value: "lp.outside_school.door_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.door_center",
            value: "lp.outside_school.door_center",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.school_inside",
            value: "lp.outside_school.school_inside",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.entrance_1",
            value: "lp.outside_school.entrance_1",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.entrance_2",
            value: "lp.outside_school.entrance_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.entrance_3",
            value: "lp.outside_school.entrance_3",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.entrance_4",
            value: "lp.outside_school.entrance_4",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.entrance_5",
            value: "lp.outside_school.entrance_5",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.entrance_6",
            value: "lp.outside_school.entrance_6",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.flagpole_1",
            value: "lp.outside_school.flagpole_1",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.flagpole_2",
            value: "lp.outside_school.flagpole_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.far_corner",
            value: "lp.outside_school.far_corner",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.stairs_1",
            value: "lp.outside_school.stairs_1",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.stairs_2",
            value: "lp.outside_school.stairs_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.stairs_3",
            value: "lp.outside_school.stairs_3",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.sidewalk_1",
            value: "lp.outside_school.sidewalk_1",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.sidewalk_2",
            value: "lp.outside_school.sidewalk_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.sidewalk_3",
            value: "lp.outside_school.sidewalk_3",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.waiting_area_1",
            value: "lp.outside_school.waiting_area_1",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.waiting_area_2",
            value: "lp.outside_school.waiting_area_2",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.to_town",
            value: "lp.outside_school.to_town",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.school",
            value: "lp.outside_school.school",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.door",
            value: "lp.outside_school.door",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.stairs_4",
            value: "lp.outside_school.stairs_4",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.absent",
            value: "lp.outside_school.absent",
            meta: "Location Position",
        },{
        caption: "lp.outside_school.none",
            value: "lp.outside_school.none",
            meta: "Location Position",
        },{
        caption: "lp.playground.absent",
            value: "lp.playground.absent",
            meta: "Location Position",
        },{
        caption: "lp.playground.none",
            value: "lp.playground.none",
            meta: "Location Position",
        },{
        caption: "lp.playground.school",
            value: "lp.playground.school",
            meta: "Location Position",
        },{
        caption: "lp.playground.sidewalk",
            value: "lp.playground.sidewalk",
            meta: "Location Position",
        },{
        caption: "lp.playground.playground_center",
            value: "lp.playground.playground_center",
            meta: "Location Position",
        },{
        caption: "lp.playground.playground_1",
            value: "lp.playground.playground_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.playground_2",
            value: "lp.playground.playground_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.playground_3",
            value: "lp.playground.playground_3",
            meta: "Location Position",
        },{
        caption: "lp.playground.playground_4",
            value: "lp.playground.playground_4",
            meta: "Location Position",
        },{
        caption: "lp.playground.playground_5",
            value: "lp.playground.playground_5",
            meta: "Location Position",
        },{
        caption: "lp.playground.dragon_1",
            value: "lp.playground.dragon_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.dragon_2",
            value: "lp.playground.dragon_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.monkeybar_left",
            value: "lp.playground.monkeybar_left",
            meta: "Location Position",
        },{
        caption: "lp.playground.monkeybar_under",
            value: "lp.playground.monkeybar_under",
            meta: "Location Position",
        },{
        caption: "lp.playground.monkeybar_center",
            value: "lp.playground.monkeybar_center",
            meta: "Location Position",
        },{
        caption: "lp.playground.monkeybar_right",
            value: "lp.playground.monkeybar_right",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_stairs",
            value: "lp.playground.slide_stairs",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_bottom",
            value: "lp.playground.slide_bottom",
            meta: "Location Position",
        },{
        caption: "lp.playground.swing_1",
            value: "lp.playground.swing_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.swing_2",
            value: "lp.playground.swing_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.seesaw_1",
            value: "lp.playground.seesaw_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.seesaw_2",
            value: "lp.playground.seesaw_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.seesaw_front",
            value: "lp.playground.seesaw_front",
            meta: "Location Position",
        },{
        caption: "lp.playground.grass_1",
            value: "lp.playground.grass_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.grass_2",
            value: "lp.playground.grass_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.bench_1",
            value: "lp.playground.bench_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.bench_2",
            value: "lp.playground.bench_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.fence_1",
            value: "lp.playground.fence_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.fence_2",
            value: "lp.playground.fence_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.fence_3",
            value: "lp.playground.fence_3",
            meta: "Location Position",
        },{
        caption: "lp.playground.fence_4",
            value: "lp.playground.fence_4",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_railing_1",
            value: "lp.playground.slide_railing_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_railing_2",
            value: "lp.playground.slide_railing_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_platform",
            value: "lp.playground.slide_platform",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_top_1",
            value: "lp.playground.slide_top_1",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_top_2",
            value: "lp.playground.slide_top_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.playground_6",
            value: "lp.playground.playground_6",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_bottom_2",
            value: "lp.playground.slide_bottom_2",
            meta: "Location Position",
        },{
        caption: "lp.playground.monkeybar",
            value: "lp.playground.monkeybar",
            meta: "Location Position",
        },{
        caption: "lp.playground.swing_1_non_sitting",
            value: "lp.playground.swing_1_non_sitting",
            meta: "Location Position",
        },{
        caption: "lp.playground.swing_2_non_sitting",
            value: "lp.playground.swing_2_non_sitting",
            meta: "Location Position",
        },{
        caption: "lp.playground.slide_top_3",
            value: "lp.playground.slide_top_3",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.clovis_window",
            value: "lp.school_ext.clovis_window",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.cool_kid_wall",
            value: "lp.school_ext.cool_kid_wall",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.main_window_1",
            value: "lp.school_ext.main_window_1",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.main_window_2",
            value: "lp.school_ext.main_window_2",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.door_1",
            value: "lp.school_ext.door_1",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.door_2",
            value: "lp.school_ext.door_2",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.door_center",
            value: "lp.school_ext.door_center",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.school_inside",
            value: "lp.school_ext.school_inside",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.entrance_1",
            value: "lp.school_ext.entrance_1",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.entrance_2",
            value: "lp.school_ext.entrance_2",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.entrance_3",
            value: "lp.school_ext.entrance_3",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.entrance_4",
            value: "lp.school_ext.entrance_4",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.entrance_5",
            value: "lp.school_ext.entrance_5",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.entrance_6",
            value: "lp.school_ext.entrance_6",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.flagpole_1",
            value: "lp.school_ext.flagpole_1",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.flagpole_2",
            value: "lp.school_ext.flagpole_2",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.far_corner",
            value: "lp.school_ext.far_corner",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.stairs_1",
            value: "lp.school_ext.stairs_1",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.stairs_2",
            value: "lp.school_ext.stairs_2",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.stairs_3",
            value: "lp.school_ext.stairs_3",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.sidewalk_1",
            value: "lp.school_ext.sidewalk_1",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.sidewalk_2",
            value: "lp.school_ext.sidewalk_2",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.sidewalk_3",
            value: "lp.school_ext.sidewalk_3",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.waiting_area_1",
            value: "lp.school_ext.waiting_area_1",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.waiting_area_2",
            value: "lp.school_ext.waiting_area_2",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.to_town",
            value: "lp.school_ext.to_town",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.school",
            value: "lp.school_ext.school",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.door",
            value: "lp.school_ext.door",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.stairs_4",
            value: "lp.school_ext.stairs_4",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.absent",
            value: "lp.school_ext.absent",
            meta: "Location Position",
        },{
        caption: "lp.school_ext.none",
            value: "lp.school_ext.none",
            meta: "Location Position",
        },{
        caption: "lp.school_front.clovis_window",
            value: "lp.school_front.clovis_window",
            meta: "Location Position",
        },{
        caption: "lp.school_front.cool_kid_wall",
            value: "lp.school_front.cool_kid_wall",
            meta: "Location Position",
        },{
        caption: "lp.school_front.main_window_1",
            value: "lp.school_front.main_window_1",
            meta: "Location Position",
        },{
        caption: "lp.school_front.main_window_2",
            value: "lp.school_front.main_window_2",
            meta: "Location Position",
        },{
        caption: "lp.school_front.door_1",
            value: "lp.school_front.door_1",
            meta: "Location Position",
        },{
        caption: "lp.school_front.door_2",
            value: "lp.school_front.door_2",
            meta: "Location Position",
        },{
        caption: "lp.school_front.door_center",
            value: "lp.school_front.door_center",
            meta: "Location Position",
        },{
        caption: "lp.school_front.school_inside",
            value: "lp.school_front.school_inside",
            meta: "Location Position",
        },{
        caption: "lp.school_front.entrance_1",
            value: "lp.school_front.entrance_1",
            meta: "Location Position",
        },{
        caption: "lp.school_front.entrance_2",
            value: "lp.school_front.entrance_2",
            meta: "Location Position",
        },{
        caption: "lp.school_front.entrance_3",
            value: "lp.school_front.entrance_3",
            meta: "Location Position",
        },{
        caption: "lp.school_front.entrance_4",
            value: "lp.school_front.entrance_4",
            meta: "Location Position",
        },{
        caption: "lp.school_front.entrance_5",
            value: "lp.school_front.entrance_5",
            meta: "Location Position",
        },{
        caption: "lp.school_front.entrance_6",
            value: "lp.school_front.entrance_6",
            meta: "Location Position",
        },{
        caption: "lp.school_front.flagpole_1",
            value: "lp.school_front.flagpole_1",
            meta: "Location Position",
        },{
        caption: "lp.school_front.flagpole_2",
            value: "lp.school_front.flagpole_2",
            meta: "Location Position",
        },{
        caption: "lp.school_front.far_corner",
            value: "lp.school_front.far_corner",
            meta: "Location Position",
        },{
        caption: "lp.school_front.stairs_1",
            value: "lp.school_front.stairs_1",
            meta: "Location Position",
        },{
        caption: "lp.school_front.stairs_2",
            value: "lp.school_front.stairs_2",
            meta: "Location Position",
        },{
        caption: "lp.school_front.stairs_3",
            value: "lp.school_front.stairs_3",
            meta: "Location Position",
        },{
        caption: "lp.school_front.sidewalk_1",
            value: "lp.school_front.sidewalk_1",
            meta: "Location Position",
        },{
        caption: "lp.school_front.sidewalk_2",
            value: "lp.school_front.sidewalk_2",
            meta: "Location Position",
        },{
        caption: "lp.school_front.sidewalk_3",
            value: "lp.school_front.sidewalk_3",
            meta: "Location Position",
        },{
        caption: "lp.school_front.waiting_area_1",
            value: "lp.school_front.waiting_area_1",
            meta: "Location Position",
        },{
        caption: "lp.school_front.waiting_area_2",
            value: "lp.school_front.waiting_area_2",
            meta: "Location Position",
        },{
        caption: "lp.school_front.to_town",
            value: "lp.school_front.to_town",
            meta: "Location Position",
        },{
        caption: "lp.school_front.school",
            value: "lp.school_front.school",
            meta: "Location Position",
        },{
        caption: "lp.school_front.door",
            value: "lp.school_front.door",
            meta: "Location Position",
        },{
        caption: "lp.school_front.stairs_4",
            value: "lp.school_front.stairs_4",
            meta: "Location Position",
        },{
        caption: "lp.school_front.absent",
            value: "lp.school_front.absent",
            meta: "Location Position",
        },{
        caption: "lp.school_front.none",
            value: "lp.school_front.none",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.entrance",
            value: "lp.school_hallway.entrance",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.classroom",
            value: "lp.school_hallway.classroom",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.playground_door",
            value: "lp.school_hallway.playground_door",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.bulletin_1",
            value: "lp.school_hallway.bulletin_1",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.bulletin_2",
            value: "lp.school_hallway.bulletin_2",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.bulletin_3",
            value: "lp.school_hallway.bulletin_3",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.bulletin_4",
            value: "lp.school_hallway.bulletin_4",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.absent",
            value: "lp.school_hallway.absent",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.none",
            value: "lp.school_hallway.none",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.classroom_1",
            value: "lp.school_hallway.classroom_1",
            meta: "Location Position",
        },{
        caption: "lp.school_hallway.classroom_2",
            value: "lp.school_hallway.classroom_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.clovis_window",
            value: "lp.school_outside.clovis_window",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.cool_kid_wall",
            value: "lp.school_outside.cool_kid_wall",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.main_window_1",
            value: "lp.school_outside.main_window_1",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.main_window_2",
            value: "lp.school_outside.main_window_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.door_1",
            value: "lp.school_outside.door_1",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.door_2",
            value: "lp.school_outside.door_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.door_center",
            value: "lp.school_outside.door_center",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.school_inside",
            value: "lp.school_outside.school_inside",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.entrance_1",
            value: "lp.school_outside.entrance_1",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.entrance_2",
            value: "lp.school_outside.entrance_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.entrance_3",
            value: "lp.school_outside.entrance_3",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.entrance_4",
            value: "lp.school_outside.entrance_4",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.entrance_5",
            value: "lp.school_outside.entrance_5",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.entrance_6",
            value: "lp.school_outside.entrance_6",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.flagpole_1",
            value: "lp.school_outside.flagpole_1",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.flagpole_2",
            value: "lp.school_outside.flagpole_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.far_corner",
            value: "lp.school_outside.far_corner",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.stairs_1",
            value: "lp.school_outside.stairs_1",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.stairs_2",
            value: "lp.school_outside.stairs_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.stairs_3",
            value: "lp.school_outside.stairs_3",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.sidewalk_1",
            value: "lp.school_outside.sidewalk_1",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.sidewalk_2",
            value: "lp.school_outside.sidewalk_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.sidewalk_3",
            value: "lp.school_outside.sidewalk_3",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.waiting_area_1",
            value: "lp.school_outside.waiting_area_1",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.waiting_area_2",
            value: "lp.school_outside.waiting_area_2",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.to_town",
            value: "lp.school_outside.to_town",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.school",
            value: "lp.school_outside.school",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.door",
            value: "lp.school_outside.door",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.stairs_4",
            value: "lp.school_outside.stairs_4",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.absent",
            value: "lp.school_outside.absent",
            meta: "Location Position",
        },{
        caption: "lp.school_outside.none",
            value: "lp.school_outside.none",
            meta: "Location Position",
        },




// EMOTE

{
        caption: "e.action_success",
            value: "e.action_success",
            meta: "Emote",
        },{
        caption: "e.adult_squat",
            value: "e.adult_squat",
            meta: "Emote",
        },{
        caption: "e.blocked",
            value: "e.blocked",
            meta: "Emote",
        },{
        caption: "e.blow_whistle",
            value: "e.blow_whistle",
            meta: "Emote",
        },{
        caption: "e.crawl",
            value: "e.crawl",
            meta: "Emote",
        },{
        caption: "e.damaged",
            value: "e.damaged",
            meta: "Emote",
        },{
        caption: "e.EnterBed",
            value: "e.EnterBed",
            meta: "Emote",
        },{
        caption: "e.ExitBed",
            value: "e.ExitBed",
            meta: "Emote",
        },{
        caption: "e.ExitBedImmediate",
            value: "e.ExitBedImmediate",
            meta: "Emote",
        },{
        caption: "e.hand_chops",
            value: "e.hand_chops",
            meta: "Emote",
        },{
        caption: "e.hand_curl",
            value: "e.hand_curl",
            meta: "Emote",
        },{
        caption: "e.hand_curl_left",
            value: "e.hand_curl_left",
            meta: "Emote",
        },{
        caption: "e.hand_curl_right",
            value: "e.hand_curl_right",
            meta: "Emote",
        },{
        caption: "e.hands_on_hips",
            value: "e.hands_on_hips",
            meta: "Emote",
        },{
        caption: "e.hands_raised",
            value: "e.hands_raised",
            meta: "Emote",
        },{
        caption: "e.hanging",
            value: "e.hanging",
            meta: "Emote",
        },{
        caption: "e.head_in_hands",
            value: "e.head_in_hands",
            meta: "Emote",
        },{
        caption: "e.head_nod",
            value: "e.head_nod",
            meta: "Emote",
        },{
        caption: "e.head_shake",
            value: "e.head_shake",
            meta: "Emote",
        },{
        caption: "e.HoldCup",
            value: "e.HoldCup",
            meta: "Emote",
        },{
        caption: "e.HorizontalVelocity",
            value: "e.HorizontalVelocity",
            meta: "Emote",
        },{
        caption: "e.isMovingUp",
            value: "e.isMovingUp",
            meta: "Emote",
        },{
        caption: "e.jump_explode",
            value: "e.jump_explode",
            meta: "Emote",
        },{
        caption: "e.jump_up",
            value: "e.jump_up",
            meta: "Emote",
        },{
        caption: "e.ladder_climb",
            value: "e.ladder_climb",
            meta: "Emote",
        },{
        caption: "e.LayDownImmediate",
            value: "e.LayDownImmediate",
            meta: "Emote",
        },{
        caption: "e.lean_backward",
            value: "e.lean_backward",
            meta: "Emote",
        },{
        caption: "e.lean_forward",
            value: "e.lean_forward",
            meta: "Emote",
        },{
        caption: "e.look_around",
            value: "e.look_around",
            meta: "Emote",
        },{
        caption: "e.move_complete",
            value: "e.move_complete",
            meta: "Emote",
        },{
        caption: "e.punch1",
            value: "e.punch1",
            meta: "Emote",
        },{
        caption: "e.RaiseHand",
            value: "e.RaiseHand",
            meta: "Emote",
        },{
        caption: "e.RaiseHandTrigger",
            value: "e.RaiseHandTrigger",
            meta: "Emote",
        },{
        caption: "e.recorder_complete",
            value: "e.recorder_complete",
            meta: "Emote",
        },{
        caption: "e.reset_state",
            value: "e.reset_state",
            meta: "Emote",
        },{
        caption: "e.Revived",
            value: "e.Revived",
            meta: "Emote",
        },{
        caption: "e.RollTrigger",
            value: "e.RollTrigger",
            meta: "Emote",
        },{
        caption: "e.scratch_head",
            value: "e.scratch_head",
            meta: "Emote",
        },{
        caption: "e.sit_ground",
            value: "e.sit_ground",
            meta: "Emote",
        },{
        caption: "e.Sitting",
            value: "e.Sitting",
            meta: "Emote",
        },{
        caption: "e.sitting_sad",
            value: "e.sitting_sad",
            meta: "Emote",
        },{
        caption: "e.slide_push",
            value: "e.slide_push",
            meta: "Emote",
        },{
        caption: "e.SlideClimbInTrigger",
            value: "e.SlideClimbInTrigger",
            meta: "Emote",
        },{
        caption: "e.SlideClimbOutTrigger",
            value: "e.SlideClimbOutTrigger",
            meta: "Emote",
        },{
        caption: "e.SlideExitTrigger",
            value: "e.SlideExitTrigger",
            meta: "Emote",
        },{
        caption: "e.SlideTrigger",
            value: "e.SlideTrigger",
            meta: "Emote",
        },{
        caption: "e.thinking",
            value: "e.thinking",
            meta: "Emote",
        },{
        caption: "e.throw",
            value: "e.throw",
            meta: "Emote",
        },{
        caption: "e.tired_1",
            value: "e.tired_1",
            meta: "Emote",
        },{
        caption: "e.tired_2",
            value: "e.tired_2",
            meta: "Emote",
        },{
        caption: "e.UnlockedChains",
            value: "e.UnlockedChains",
            meta: "Emote",
        },{
        caption: "e.Velocity",
            value: "e.Velocity",
            meta: "Emote",
        },{
        caption: "e.VerticalVelocity",
            value: "e.VerticalVelocity",
            meta: "Emote",
        },{
        caption: "e.wand_wave",
            value: "e.wand_wave",
            meta: "Emote",
        },{
        caption: "e.Waving",
            value: "e.Waving",
            meta: "Emote",
        },{
        caption: "e.whisper",
            value: "e.whisper",
            meta: "Emote",
        },




// UNLOCK ACTION

{
        caption: "u.charlie_hallway.lights_on",
            value: "u.charlie_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_hallway.lights_off",
            value: "u.charlie_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_hallway.light_stairway_on",
            value: "u.charlie_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_hallway.light_stairway_off",
            value: "u.charlie_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_hallway.light_ceiling_on",
            value: "u.charlie_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_hallway.light_ceiling_off",
            value: "u.charlie_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.daytime",
            value: "u.charlie_house.daytime",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.fridge_open",
            value: "u.charlie_house.fridge_open",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.fridge_open_slow",
            value: "u.charlie_house.fridge_open_slow",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.fridge_close",
            value: "u.charlie_house.fridge_close",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.fridge_close_fast",
            value: "u.charlie_house.fridge_close_fast",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.tv_on",
            value: "u.charlie_house.tv_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.tv_off",
            value: "u.charlie_house.tv_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.lights_on",
            value: "u.charlie_house.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.lights_off",
            value: "u.charlie_house.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.light_left_on",
            value: "u.charlie_house.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.light_left_off",
            value: "u.charlie_house.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.light_right_on",
            value: "u.charlie_house.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house.light_right_off",
            value: "u.charlie_house.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house_hallway.lights_on",
            value: "u.charlie_house_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house_hallway.lights_off",
            value: "u.charlie_house_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house_hallway.light_stairway_on",
            value: "u.charlie_house_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house_hallway.light_stairway_off",
            value: "u.charlie_house_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house_hallway.light_ceiling_on",
            value: "u.charlie_house_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_house_hallway.light_ceiling_off",
            value: "u.charlie_house_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_room.lights_on",
            value: "u.charlie_room.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_room.lights_off",
            value: "u.charlie_room.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_room.lamp_on",
            value: "u.charlie_room.lamp_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_room.lamp_off",
            value: "u.charlie_room.lamp_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_room.ceiling_light_on",
            value: "u.charlie_room.ceiling_light_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlie_room.ceiling_light_off",
            value: "u.charlie_room.ceiling_light_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_hallway.lights_on",
            value: "u.charlies_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_hallway.lights_off",
            value: "u.charlies_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_hallway.light_stairway_on",
            value: "u.charlies_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_hallway.light_stairway_off",
            value: "u.charlies_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_hallway.light_ceiling_on",
            value: "u.charlies_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_hallway.light_ceiling_off",
            value: "u.charlies_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.daytime",
            value: "u.charlies_house.daytime",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.fridge_open",
            value: "u.charlies_house.fridge_open",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.fridge_open_slow",
            value: "u.charlies_house.fridge_open_slow",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.fridge_close",
            value: "u.charlies_house.fridge_close",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.fridge_close_fast",
            value: "u.charlies_house.fridge_close_fast",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.tv_on",
            value: "u.charlies_house.tv_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.tv_off",
            value: "u.charlies_house.tv_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.lights_on",
            value: "u.charlies_house.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.lights_off",
            value: "u.charlies_house.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.light_left_on",
            value: "u.charlies_house.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.light_left_off",
            value: "u.charlies_house.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.light_right_on",
            value: "u.charlies_house.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house.light_right_off",
            value: "u.charlies_house.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house_hallway.lights_on",
            value: "u.charlies_house_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house_hallway.lights_off",
            value: "u.charlies_house_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house_hallway.light_stairway_on",
            value: "u.charlies_house_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house_hallway.light_stairway_off",
            value: "u.charlies_house_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house_hallway.light_ceiling_on",
            value: "u.charlies_house_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_house_hallway.light_ceiling_off",
            value: "u.charlies_house_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_room.lights_on",
            value: "u.charlies_room.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_room.lights_off",
            value: "u.charlies_room.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_room.lamp_on",
            value: "u.charlies_room.lamp_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_room.lamp_off",
            value: "u.charlies_room.lamp_off",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_room.ceiling_light_on",
            value: "u.charlies_room.ceiling_light_on",
            meta: "Unlock Action",
        },{
        caption: "u.charlies_room.ceiling_light_off",
            value: "u.charlies_room.ceiling_light_off",
            meta: "Unlock Action",
        },{
        caption: "u.classroom.lights_on",
            value: "u.classroom.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.classroom.lights_off",
            value: "u.classroom.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.house_hallway.lights_on",
            value: "u.house_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.house_hallway.lights_off",
            value: "u.house_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.house_hallway.light_stairway_on",
            value: "u.house_hallway.light_stairway_on",
            meta: "Unlock Action",
        },{
        caption: "u.house_hallway.light_stairway_off",
            value: "u.house_hallway.light_stairway_off",
            meta: "Unlock Action",
        },{
        caption: "u.house_hallway.light_ceiling_on",
            value: "u.house_hallway.light_ceiling_on",
            meta: "Unlock Action",
        },{
        caption: "u.house_hallway.light_ceiling_off",
            value: "u.house_hallway.light_ceiling_off",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.daytime",
            value: "u.living_room.daytime",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.fridge_open",
            value: "u.living_room.fridge_open",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.fridge_open_slow",
            value: "u.living_room.fridge_open_slow",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.fridge_close",
            value: "u.living_room.fridge_close",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.fridge_close_fast",
            value: "u.living_room.fridge_close_fast",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.tv_on",
            value: "u.living_room.tv_on",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.tv_off",
            value: "u.living_room.tv_off",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.lights_on",
            value: "u.living_room.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.lights_off",
            value: "u.living_room.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.light_left_on",
            value: "u.living_room.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.light_left_off",
            value: "u.living_room.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.light_right_on",
            value: "u.living_room.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u.living_room.light_right_off",
            value: "u.living_room.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u.school_hallway.lights_on",
            value: "u.school_hallway.lights_on",
            meta: "Unlock Action",
        },{
        caption: "u.school_hallway.lights_off",
            value: "u.school_hallway.lights_off",
            meta: "Unlock Action",
        },{
        caption: "u.school_hallway.light_left_on",
            value: "u.school_hallway.light_left_on",
            meta: "Unlock Action",
        },{
        caption: "u.school_hallway.light_left_off",
            value: "u.school_hallway.light_left_off",
            meta: "Unlock Action",
        },{
        caption: "u.school_hallway.light_right_on",
            value: "u.school_hallway.light_right_on",
            meta: "Unlock Action",
        },{
        caption: "u.school_hallway.light_right_off",
            value: "u.school_hallway.light_right_off",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_off",
            value: "u.riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_on",
            value: "u.riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_off",
            value: "u.riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_on",
            value: "u.riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_off",
            value: "u.riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_on",
            value: "u.riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.run_guide_off",
            value: "u.run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.run_guide_on",
            value: "u.run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.move_guide_off",
            value: "u.move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.move_guide_on",
            value: "u.move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.skills_guide_off",
            value: "u.skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.skills_guide_on",
            value: "u.skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.combat_tips_show",
            value: "u.combat_tips_show",
            meta: "Unlock Action",
        },{
        caption: "u.combat_tips_hide",
            value: "u.combat_tips_hide",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_off",
            value: "u.riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_on",
            value: "u.riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_off",
            value: "u.riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_on",
            value: "u.riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.run_guide_off",
            value: "u.run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.run_guide_on",
            value: "u.run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_off",
            value: "u.riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_on",
            value: "u.riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_off",
            value: "u.riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_on",
            value: "u.riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.move_guide_off",
            value: "u.move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.move_guide_on",
            value: "u.move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_off",
            value: "u.riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_on",
            value: "u.riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_off",
            value: "u.riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_on",
            value: "u.riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.skills_guide_off",
            value: "u.skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.skills_guide_on",
            value: "u.skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.hide_chained_riley",
            value: "u.hide_chained_riley",
            meta: "Unlock Action",
        },{
        caption: "u.ch2_door_basement",
            value: "u.ch2_door_basement",
            meta: "Unlock Action",
        },{
        caption: "u.final_slide",
            value: "u.final_slide",
            meta: "Unlock Action",
        },{
        caption: "u.add_star ",
            value: "u.add_star ",
            meta: "Unlock Action",
        },{
        caption: "u.remove_star ",
            value: "u.remove_star ",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_on",
            value: "u.riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.run_guide_off",
            value: "u.run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.skills_guide_on",
            value: "u.skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_on",
            value: "u.riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_on",
            value: "u.riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_off",
            value: "u.riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_off",
            value: "u.riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_off",
            value: "u.riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.move_guide_off",
            value: "u.move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.skills_guide_off",
            value: "u.skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_off",
            value: "u.riley_move_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.combat_block_run",
            value: "u.combat_block_run",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_off",
            value: "u.riley_skills_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_off",
            value: "u.riley_run_guide_off",
            meta: "Unlock Action",
        },{
        caption: "u.riley_move_guide_on",
            value: "u.riley_move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_run_guide_on",
            value: "u.riley_run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_skills_guide_on",
            value: "u.riley_skills_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.move_guide_on",
            value: "u.move_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.run_guide_on",
            value: "u.run_guide_on",
            meta: "Unlock Action",
        },{
        caption: "u.riley_chained_flipx",
            value: "u.riley_chained_flipx",
            meta: "Unlock Action",
        },




// CHASE SPEED

{
        caption: "c_chase_speed.very_slow",
            value: "c_chase_speed.very_slow",
            meta: "Chase Speed",
        },{
        caption: "c_chase_speed.slow",
            value: "c_chase_speed.slow",
            meta: "Chase Speed",
        },{
        caption: "c_chase_speed.normal",
            value: "c_chase_speed.normal",
            meta: "Chase Speed",
        },{
        caption: "c_chase_speed.fast",
            value: "c_chase_speed.fast",
            meta: "Chase Speed",
        },{
        caption: "c_chase_speed.very_fast",
            value: "c_chase_speed.very_fast",
            meta: "Chase Speed",
        },




// ZOOM SPEED

{
        caption: "c_zoom_speed.very_slow",
            value: "c_zoom_speed.very_slow",
            meta: "Zoom Speed",
        },{
        caption: "c_zoom_speed.slow",
            value: "c_zoom_speed.slow",
            meta: "Zoom Speed",
        },{
        caption: "c_zoom_speed.normal",
            value: "c_zoom_speed.normal",
            meta: "Zoom Speed",
        },{
        caption: "c_zoom_speed.fast",
            value: "c_zoom_speed.fast",
            meta: "Zoom Speed",
        },{
        caption: "c_zoom_speed.very_fast",
            value: "c_zoom_speed.very_fast",
            meta: "Zoom Speed",
        },




// ZOOM SIZE

{
        caption: "c_zoom_size.very_slow",
            value: "c_zoom_size.very_slow",
            meta: "Zoom Size",
        },{
        caption: "c_zoom_size.slow",
            value: "c_zoom_size.slow",
            meta: "Zoom Size",
        },{
        caption: "c_zoom_size.normal",
            value: "c_zoom_size.normal",
            meta: "Zoom Size",
        },{
        caption: "c_zoom_size.fast",
            value: "c_zoom_size.fast",
            meta: "Zoom Size",
        },{
        caption: "c_zoom_size.very_fast",
            value: "c_zoom_size.very_fast",
            meta: "Zoom Size",
        },





    
    );
    
    return suggestions;
}