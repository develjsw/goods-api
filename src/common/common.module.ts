import { Global, Module } from '@nestjs/common';
import { SlackService } from './webhook/slack/slack.service';

@Global()
@Module({
    imports: [],
    providers: [SlackService],
    exports: [SlackService]
})
export class CommonModule {}
